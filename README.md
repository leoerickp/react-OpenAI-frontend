# React GPT 🤖

A modern graphical user interface built with **React**, **TypeScript**, and **Vite**, powered by a robust **NestJS Backend** that integrates seamlessly with the **OpenAI API**.

## 🌟 Key Features & Integrations

This project is a full-stack application that leverages the power of OpenAI to perform various natural language and generative tasks.

### 🧠 OpenAI Powered Backend
The backend application is entirely driven by a **NestJS** architecture, acting as a secure and scalable middleware to interact with OpenAI models (like GPT-4, Whisper, DALL-E, etc.). It manages rate limiting, API keys, and complex data streaming, ensuring the React frontend remains fast and responsive.

### 🛠️ Software Architecture & Design Patterns
To promote maintainability and clean code, the frontend application extensively uses established design patterns:

*   **Adapter Pattern:** Abstracts away third-party dependencies. For example, the `FetchAdapter` (`src/config/adapters/http/fetch.adapter.ts`) wraps the native Fetch API, allowing the application to easily switch HTTP clients without affecting core business logic or use cases.
*   **Builder Pattern:** Simplifies the construction of complex objects. It is used to construct customized HTTP responses (e.g., `HttpResponseBuilder`) cleanly and step-by-step, making the codebase much more readable and easier to extend.

## 🗂️ Features & Menu Options

The application is split into several interactive AI modules:

1.  **📝 Orthography (Spell Check & Grammar)**
    Allows users to input text and receive grammatical corrections, spelling fixes, and suggestions for better phrasing using AI.
2.  **⚖️ Pros & Cons**
    Provides an objective list of pros and cons for any given topic, helping users make informed decisions.
3.  **🌊 Pros & Cons (Stream)**
    Similar to the Pros & Cons feature, but utilizes Server-Sent Events (SSE) to stream the AI's response in real-time, providing immediate feedback as the model generates the text.
4.  **🌐 Translate**
    A powerful translation tool relying on OpenAI's advanced contextual understanding to translate text between multiple languages accurately.
5.  **🗣️ Text to Audio**
    Converts written text into lifelike spoken audio using OpenAI's Text-to-Speech (TTS) models.
6.  **🎙️ Audio to Text**
    Transcribes spoken audio files into written text utilizing the Whisper model.
7.  **🎨 Image Generation**
    Generates unique images based on descriptive text prompts using DALL-E models.
8.  **🤖 Assistant**
    A fully conversational AI assistant capable of maintaining context across messages, answering questions, and assisting with various tasks.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A running instance of the companion NestJS backend.
- OpenAI API Key configured in your backend environment.

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

## 🏗️ Tech Stack

- **Frontend Core:** React, TypeScript, Vite
- **Backend Service:** NestJS, OpenAI SDK
- **Architecture & Patterns:** Clean Architecture, Adapter Pattern, Builder Pattern
