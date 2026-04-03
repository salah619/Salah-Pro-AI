# Salah Pro AI 🚀 (Web Intelligence)
![Cloudflare](https://img.shields.io/badge/Hosted_on-Cloudflare_Pages-orange.svg)
![Backend](https://img.shields.io/badge/Backend-Cloudflare_Workers-blue.svg)
![AI](https://img.shields.io/badge/AI-Groq_Llama3-green.svg)

## 📌 Overview
**Salah Pro AI** is a professional web-based AI interface. Unlike bot-based systems, this project provides a clean web UI hosted on **Cloudflare Pages**, utilizing **Cloudflare Workers** as a secure proxy to interact with the **Groq API**.

## 🏗 System Architecture
1. **Frontend**: HTML/JS hosted on Cloudflare Pages.
2. **Middleware**: Cloudflare Worker (`worker.js`) to hide API keys and handle CORS.
3. **AI Engine**: Groq Llama 3 for ultra-fast processing.

## ⚙️ Setup & Deployment
Detailed setup instructions for the Cloudflare Worker and environment variables can be found in:
👉 `CLOUDFLARE_WORKER_SETUP.md`

### Quick Deployment Summary:
1. Deploy the Worker with your `GROQ_API_KEY`.
2. Update `index.html` with your Worker URL.
3. Push to GitHub to trigger Cloudflare Pages deployment.

## 🛠 Tech Stack
*   **Frontend**: HTML5, CSS3, JavaScript.
*   **Serverless**: Cloudflare Workers.
*   **AI Engine**: Groq API (Llama 3.3/3.2).
*   **Security**: Environment Variable Isolation.

---
*Developed by: **Eng. Salah Al-Wafi** 🧑‍💻*

