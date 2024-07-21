---
title: "첫 번째 블로그 게시글"
date: 2023-07-21
description: "이것은 첫 번째 블로그 게시글입니다."
authors:
  - kim
draft: true # 빌드할때 초안으로 사용
comments: true
# pin: true # 페이지 상단에 고정
readtime: 15 # 읽는 시간, 비활성화 하면 자동 계산
slug: ai_1
status: new
tags:
  - example
  - first
categories:
  - category1
  - category2
---

## 1. 환경 세팅

- `cloudfare` 설치
  - 설치 이유 : 로컬에서 실행 중인 웹 서버에 접근하기 위한 **public url을 편리하게 생성(https)**하기 위해
  - Mac : brew install cloudflared
  - Window : winget install --id Cloudflare.cloudflared
  - 설치 후 `cloudfared help` 입력하여 정상 설치 여부 확인
- **Tech Stack**
  - RAG : Langchain
  - Server : FastAPI
  - VectorDB : Pinecone

## 2. FastAPI를 활용하여 서버 구축

- **API를 사용하지 않고서는 요청에 답변할 수 없도록 구현**
- gpts 생성 시에 아래 쿼리 전송 - 명언 생성

```
I want to create a GPT called "Quotes by Jang Ho Maximus The Third."
He was an emperor of the kingdom of Mandoo, and I want to make a GPT that provides users with his quotes.
```

- GPT 학습 데이터에는 **만두 왕국의 황제인 장호 막시무스 3세에 대한 정보는 없을 것**임, 따라서 명언 자체에 대한 정보가 없을 것.
- 이에 해당 명언 정보를 제공하는 API를 설계하고 해당 API를 사용할 수 있도록 강제하는 것이 포인트.

### 2-1. API 서버 구축

[FastAPI](https://fastapi.tiangolo.com/ko/)

- FastAPI 사용
  → FastAPI는 서버를 만들기 위한 프레임워크인데, Flask와 비슷하지만 조금 더 API를 만드는 것에 초점이 맞추어져 있음.
- 세팅
  - `pip install fastapi`
  - `pip install uvicorn`
- 기초 예제

  ```python
  from fastapi import FastAPI
  from pydantic import BaseModel,Field

  # 서버 구축
  app = FastAPI(
      title="Jang Ho Maximus Quote Giver", # 이름
      description="Get a real quote said by Jang Ho Maximus himself.", # 설명
      servers=[
          {"url":"https://sur-chain-sentence-assured.trycloudflare.com"} # 제공될 서버 URL을 설정
      ]
  )

  # 명언의 데이터 형식 지정
  class QuoteArgsSchema(BaseModel):
  		# 'quote' 필드를 정의
      quote: str = Field( # 문자열 타입
          description="The quote that Jang Ho Maximus said.",
      )
      # 'year' 필드를 정의
      year: int = Field( # 정수 타입
          description="The year when Jang Ho Maximus said the quote.",
      )

  # 데코레이터를 사용하여 '/quote' 엔드포인트에 대한 GET 요청을 get_quote 함수를 사용하여 처리
  @app.get(
      "/quote", # 엔드포인트 URL 설정

      summary="Returns a random quote by Jang Ho Maximus",

      description="Upon receiving a GET request this endpoint will return a real quiote said by Jang Ho Maximus himself.",

      response_description="A Quote object that contains the quote said by Jang Ho Maximus and the date when the quote was said.",

      response_model=QuoteArgsSchema, # 응답 모델로 사용할 데이터 스키마(명언: 문자열 타입, 연도: 정수 타입) 설정
      )
  # '/quote' 엔드포인트로 GET 요청이 들어왔을 때 실행
  def get_quote():
      return {
          "quote": "삶은 짧다...먹고 싶은거 다먹어라..",
          "year": 2024,
      }
  ```
