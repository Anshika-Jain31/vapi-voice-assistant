# 🧠 Budger AI Voice Assistant – Vapi Integration

This project is a **real-time AI voice assistant** built using **React** and **Vapi.ai SDK**. It allows users to have full-duplex voice conversations powered by GPT and custom backend logic.

## 🔥 Features

- 🎙️ **Full-Duplex Conversation** – The assistant listens and speaks simultaneously
- ⚡ **Real-Time Streaming** – Sends and receives messages instantly via Vapi SDK
- 🛠️ **Custom Backend Integration** – Can be connected with FastAPI or other APIs
- 🎛️ **Audio Level Visualization** – Visual feedback while speaking/listening
- 🧩 **Modular Components** – Easily customizable frontend

## 📦 Tech Stack

- React + TypeScript
- Vapi.ai SDK (`@vapi-ai/web`)
- Tailwind CSS
- Node.js + npm

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the root and add the following:

```bash
VITE_VAPI_API_URL=https://api.vapi.ai
VITE_VAPI_WEB_TOKEN=your-web-token-here
VITE_VAPI_AGENT_ID=your-agent-id-here
```

📝 Replace the placeholders with your actual Vapi.ai API credentials.

### 4. Run the project

```bash
npm run dev
```

Open http://localhost:5173 in your browser to use the voice assistant.


