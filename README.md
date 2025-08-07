# 🧠 Budger AI Voice Assistant – Vapi Integration

This project is a **real-time AI voice assistant** built using **React** and **Vapi.ai SDK**. It enables full-duplex voice conversations using GPT-based intelligence and can be integrated with your custom backend.

## 🔥 Features

- 🎙️ **Full-Duplex Conversation** – Listen and respond simultaneously
- ⚡ **Real-Time Streaming** – Powered by Vapi’s low-latency communication
- 🛠️ **Custom Backend Integration** – Easily connect to FastAPI or any other API
- 🎛️ **Voice Visualization** – Real-time audio level visual feedback
- 🧩 **Modular Architecture** – Clean and scalable React + TypeScript setup

## 🧰 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS

- **Voice SDK:** @vapi-ai/web

- **Package Manager:** Node.js + npm

---

## 🖥️ Prerequisites

Make sure the following tools are installed:

Node.js (LTS version recommended): https://nodejs.org

npm (comes with Node.js)

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
or 
```bash
pip install npm
```

**(Optional but recommended)**

```bash
#Clean install if issues occur
rm -rf node_modules
rm package-lock.json
npm install
```

### 3. Configure environment variables

Create a .env file in the root and add the following:

```bash
VITE_VAPI_API_URL=https://api.vapi.ai
VITE_VAPI_WEB_TOKEN=your-web-token-here
VITE_VAPI_AGENT_ID=2fb50c08-a734-4620-8f6e-45cddbd1cc1c
```

📝 Replace the placeholders with your actual Vapi.ai API credentials.

### 4. Run the project

```bash
npm run dev
```

Open http://localhost:5173 in your browser to use the voice assistant.


