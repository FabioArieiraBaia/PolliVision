# 🎬 PolliVision - AI Video Generator

<div align="center">

![PolliVision Logo](https://img.shields.io/badge/PolliVision-AI%20Video%20Generator-fbbf24?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzBhMGEwZiIgZD0iTTQgNGgxNnYxMkg0eiIvPjxwYXRoIGZpbGw9IiNmYmJmMjQiIGQ9Ik0xMCA4djhsNi00eiIvPjwvc3ZnPg==)

**Create stunning AI-generated videos using natural language prompts.**

*Powered by [Pollinations.ai](https://pollinations.ai) - The Open-Source AI Platform*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-success?style=for-the-badge)](https://fabioarieira.com/pollivision)
[![Pollinations](https://img.shields.io/badge/Powered%20by-Pollinations.ai-fbbf24?style=for-the-badge)](https://pollinations.ai)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[Live Demo](https://fabioarieira.com/pollivision) • [Documentation](#-documentation) • [Report Bug](https://github.com/FabioArieiraBaia/PolliVision/issues)

</div>

---

## ✨ Features

<table>
<tr>
<td>

### 🎥 AI Video Generation
Transform text descriptions into stunning videos using cutting-edge AI models powered by Pollinations.ai

### 💬 Chat Interface
Beautiful, intuitive chat interface inspired by modern AI assistants. Just describe what you want to see!

### ⚡ Smart Prompt Enhancement
AI automatically enhances your prompts for cinematic, professional results

### 🔐 Secure API Key Storage
Your API key is stored locally in your browser - never sent to external servers

</td>
<td>

### 🎨 Premium UI/UX
Sleek, modern design with smooth animations and glass-morphism effects

### 💰 Pollen Credit System
Easy-to-understand credit system with multiple pricing tiers

### 📱 Fully Responsive
Works beautifully on desktop, tablet, and mobile devices

### 🌙 Dark Mode
Eye-friendly dark theme optimized for long creative sessions

</td>
</tr>
</table>

---

## 🖼️ Screenshots

<div align="center">

| Chat Interface | Video Generation | Pricing Modal |
|:---:|:---:|:---:|
| ![Chat](https://via.placeholder.com/300x200/0a0a0f/fbbf24?text=Chat+Interface) | ![Video](https://via.placeholder.com/300x200/0a0a0f/fbbf24?text=Video+Generation) | ![Pricing](https://via.placeholder.com/300x200/0a0a0f/fbbf24?text=Pricing+Modal) |

</div>

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/FabioArieiraBaia/PolliVision.git

# Navigate to project directory
cd PolliVision

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) | UI Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) | Type Safety |
| ![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite) | Build Tool |
| ![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss) | Styling |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?logo=framer) | Animations |
| ![Zustand](https://img.shields.io/badge/Zustand-5-brown) | State Management |

---

## 🌐 How It Uses Pollinations.ai

PolliVision is built entirely on **Pollinations.ai's free and open API**:

### 1. 🎬 Video Generation API
```typescript
const videoUrl = `https://video.pollinations.ai/prompt/${encodedPrompt}`;
```
Transforms text prompts into stunning AI-generated videos.

### 2. 🖼️ Image Generation (Thumbnails)
```typescript
const thumbnailUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
```
Creates beautiful video thumbnails using the Flux model.

### 3. 💬 Text Generation (Prompt Enhancement)
```typescript
const enhancedPrompt = await fetch(`https://text.pollinations.ai/${prompt}`);
```
Enhances user prompts for better video quality using AI.

### Why Pollinations?

- ✅ **Free API** - No credit card required to start
- ✅ **Open Source** - Transparent and community-driven
- ✅ **High Quality** - State-of-the-art AI models
- ✅ **Fast** - Quick generation times
- ✅ **No Rate Limits** - Create without restrictions

---

## 💰 Pollen Credit System

| Tier | Polens | Price | Videos |
|------|--------|-------|--------|
| 🎁 Free | 50 | $0 | ~5 videos |
| 🌱 Starter | 100 | $4.99 | ~10 videos |
| ⭐ Creator | 500 | $14.99 | ~50 videos |
| 🚀 Pro | 1,500 | $39.99 | ~150 videos |
| 👑 Enterprise | 5,000 | $99.99 | ~500 videos |

*Credits support the Pollinations.ai infrastructure and development.*

---

## 📁 Project Structure

```
pollivision/
├── src/
│   ├── components/
│   │   ├── ChatInterface.tsx    # Main chat UI
│   │   ├── Header.tsx           # App header
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── ApiKeyModal.tsx      # API key configuration
│   │   └── PricingModal.tsx     # Credit purchase modal
│   ├── services/
│   │   └── pollinationsApi.ts   # Pollinations API integration
│   ├── store/
│   │   └── useStore.ts          # Zustand state management
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── public/
│   └── favicon.svg              # App icon
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

<div align="center">

**Fábio Arieira**

Full Stack Developer | AI Enthusiast

[![Website](https://img.shields.io/badge/Website-fabioarieira.com-fbbf24?style=for-the-badge)](https://fabioarieira.com)
[![GitHub](https://img.shields.io/badge/GitHub-FabioArieiraBaia-181717?style=for-the-badge&logo=github)](https://github.com/FabioArieiraBaia)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/fabioarieira)

</div>

---

## 🙏 Acknowledgments

<div align="center">

### Special Thanks to [Pollinations.ai](https://pollinations.ai) 🌸

*For providing an amazing free and open-source AI platform that makes projects like PolliVision possible.*

The generosity of the Pollinations team in offering free access to cutting-edge AI technology is **democratizing creative content generation** and enabling independent developers to build innovative tools.

**Thank you for making this possible!** 💛

---

<sub>Made with ❤️ and powered by 🌸 Pollinations.ai</sub>

</div>


