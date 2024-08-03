# 시스템 모듈
import os
from dotenv import load_dotenv

# FastAPI 모듈
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# 랭체인 모듈
from langchain_community.vectorstores import FAISS
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.prompts import ChatPromptTemplate
from langchain.schema.runnable import RunnableLambda, RunnablePassthrough
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory 
from langchain_core.prompts import MessagesPlaceholder

# 환경변수 로드
load_dotenv()

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 실제 배포 시 특정 오리진으로 제한하세요
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 벡터 DB 설정
DB_INDEX = "MANUAL_DB"
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.load_local(DB_INDEX, embeddings, allow_dangerous_deserialization=True)
# retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
retriever = vectorstore.as_retriever(search_type="mmr", search_kwargs={"k": 4})

# LLM 모델 설정
llm = ChatOpenAI(
    model_name="gpt-4",
    temperature=0,
    streaming=True,
)

# 프롬프트 템플릿
prompt = ChatPromptTemplate.from_messages([
    ("system",
    """
    Answer the question using ONLY the following context.
    If you don't know the answer just say you don't know. DON'T make anything up. (This is very important)
    Provide all responses in Korean.

    If there are prerequisites in the context, mention them in the response, using the format [title](link).

    Based on the complexity of the request and the specificity needed, choose ONE of the following three response types:

    1. Concise Answer: For simple, straightforward questions where the answer is available in the context. Provide a brief answer in 1-3 sentences.

    2. Step-by-Step Guide: For questions involving a process where steps are available in the context. Provide a detailed step-by-step guide, starting with the first step.

    3. Request for Specificity: For broad questions or those with multiple possible answers, where the context doesn't provide enough details. Ask the user for more specific information.

    Choose the most appropriate response type based on the question and available context. Do not include explanations about the other response types in your answer.
    And If the context includes a source link, provide this link at the end of the answer using the format [link_text](link).

    ---
    
    Context:{context}
    """),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{question}"),
])

# 검색 증강 문서 처리
def formatting_docs(docs):
    unique_sources = set()
    context = []
    for doc in docs:
        # source = doc.metadata.get("source", "")
        # if source not in unique_sources and os.path.exists(source):
        #     unique_sources.add(source)
        #     with open(source, 'r', encoding='utf-8') as file:
        #         content = file.read()
        #         context.append(content)
        context.append(doc.page_content)
    
    return "\n\n".join(context)

# 대화 메모리 설정
memory = ConversationBufferMemory(return_messages=True, memory_key="chat_history")

# 체인 설정
chain = {
    "context": retriever | RunnableLambda(formatting_docs),
    "chat_history": RunnableLambda(lambda _: memory.load_memory_variables({}).get('chat_history', [])),
    "question": RunnablePassthrough()
} | prompt | llm 

# 스트리밍 응답을 위한 제너레이터 함수
async def stream_response(query):
    response = chain.invoke(query)
    for chunk in response:
        yield f"data: {chunk.content}\n\n"
    yield "data: [DONE]\n\n"

# 대화 메모리를 사용한 입력 및 출력 관리 (필요시 사용)
def run_chain_with_memory(query):
    response = chain.invoke(query)
    memory.save_context(
        inputs={"human": query},
        outputs={"ai": response.content}
    )
    return response



@app.post("/api/chat")
async def chat(request: Request):
    data = await request.json()
    query = data.get("message", "")
    response_message = run_chain_with_memory(query)
    return JSONResponse(content={"response": response_message.content})


