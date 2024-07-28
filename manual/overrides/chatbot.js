class Chatbot {
  constructor() {
    this.toggleBtn = document.getElementById("chatbot-toggle")
    this.closeBtn = document.getElementById("chatbot-close")
    this.chatWindow = document.getElementById("chatbot-window")
    this.chatMessages = document.getElementById("chat-messages")
    this.userInput = document.getElementById("user-input")
    this.sendButton = document.getElementById("send-button")

    this.toggleBtn.addEventListener("click", () => this.toggleChat())
    this.closeBtn.addEventListener("click", () => this.toggleChat())
    this.sendButton.addEventListener("click", () => this.sendMessage())
    this.userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage()
    })
  }

  toggleChat() {
    this.chatWindow.classList.toggle("hidden")
  }

  async sendMessage() {
    const message = this.userInput.value.trim()
    if (message === "") return

    this.addMessage("user", message)
    this.userInput.value = ""

    // 로딩 인디케이터 추가
    const loadingIndicator = this.addLoadingIndicator()

    try {
      const response = await fetch("http://127.0.0.1:8001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      })

      const data = await response.json()
      this.updateMessage(loadingIndicator, data.response)
    } catch (error) {
      console.error("Error:", error)
      this.updateMessage(
        loadingIndicator,
        "Sorry, an error occurred. Please try again."
      )
    }
  }

  addMessage(sender, message) {
    const messageElement = document.createElement("div")
    messageElement.classList.add("message", `${sender}-message`)
    messageElement.textContent = message
    this.chatMessages.appendChild(messageElement)
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight
    return messageElement
  }

  addLoadingIndicator() {
    const loadingElement = document.createElement("div")
    loadingElement.classList.add("message", "bot-message", "loading-message")
    loadingElement.innerHTML = `
      <div class="spinner"></div>
      <span class="loading-text">응답 중...</span>
    `
    this.chatMessages.appendChild(loadingElement)
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight
    return loadingElement
  }

  updateMessage(element, newMessage) {
    element.classList.remove("loading-message")
    element.innerHTML = newMessage // 로딩 인디케이터를 메시지로 교체
  }
}

// 페이지 로드 시 Chatbot 인스턴스 생성
document.addEventListener("DOMContentLoaded", () => {
  new Chatbot()
})
