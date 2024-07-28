const api = "http://127.0.0.1:8001"

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

    this.initializeButtons()
  }

  toggleChat() {
    this.chatWindow.classList.toggle("hidden")
  }

  initializeButtons() {
    const buttons = this.chatMessages.querySelectorAll(".service-button")
    buttons.forEach((button) => {
      button.addEventListener("click", () =>
        this.sendMessage(button.textContent)
      )
    })
  }

  addMessage(sender, message) {
    const messageElement = document.createElement("div")
    messageElement.classList.add("message", `${sender}-message`)
    messageElement.textContent = message
    this.chatMessages.appendChild(messageElement)
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight
  }

  async sendMessage(message = this.userInput.value.trim()) {
    if (message === "") return

    this.addMessage("user", message)
    this.userInput.value = ""

    const loadingIndicator = this.addLoadingIndicator()

    try {
      const response = await fetch(`${api}/chat`, {
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
        "오류가 발생했습니다. 다시 시도해주세요."
      )
    }
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
    element.innerHTML = newMessage
  }
}

document.addEventListener("DOMContentLoaded", () => new Chatbot())
