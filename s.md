

# 














# Option *you only have this files*

![alt text](image.png)

**Step 1:** Have exactly all files needed (shown above), copy or fork

**Step 2:** Go to your terminal, and

**Step 3:** bash to install dependencies, then

```bash
npm install
```

**Step 4:** bash to run the app locally

```bash
npm run dev
```

**Step 5:** Enjoy


### LLM Hub with all 108 AI platforms accros the world!

- **Major (4):** ChatGPT, Claude, Gemini, Copilot
- **Search (7):** Perplexity, You.com, Phind, Andi, Metaphor, Komo, Consensus, Elicit, ScholarAI
- **Multi-Model (6):** Poe, HuggingChat, Forefront, Ora.ai, Nat.dev, ChatHub
- **Open Source (6):** Meta AI, Mistral, DeepSeek, LMSYS, Ollama, Grok
- **Chinese (13):** ERNIE, Tongyi, ChatGLM, Spark, Tiangong, SenseChat, Doubao, Kimi, Wenxin, MiniMax, Yi, StepChat, Yuanbao
- **Specialized (8):** Character.AI, Jasper, Writesonic, Copy.ai, Rytr, ChatPDF, Humata, ChatDOC
- **Coding (12):** Codeium, Tabnine, Replit, Cursor, GitHub Copilot, CodeWhisperer, CodiumAI, Cody, Aider, v0, Bolt.new, Lovable
- **Regional (6):** Clova X, Wrtn, YandexGPT, Rinna, Sakana, KoGPT
- **Education (5):** Khanmigo, Socratic, Quizlet, Gradescope, Tutorly
- **Creative (10):** Midjourney, DALL-E, Leonardo, Playground, Stable Diffusion, Ideogram, Flux, Runway, Pika, Sora
- **Voice (5):** ElevenLabs, Murf, Resemble, Descript, Speechify
- **Experimental (7):** Pi, Cohere, AI21, OpenRouter, Together AI, Fireworks, Replicate
- **Productivity (7):** Notion, Mem, Otter, Fireflies, Grammarly, Wordtune, Chatbase
- **Business (5):** Harvey, Intercom, Drift, Ada, Einstein GPT
- **Developer (5):** Claude Console, OpenAI Playground, Vercel AI, LangChain, LlamaIndex







A web application that allows you to organize and access multiple AI LLM platforms in one interface. Built with React, Vite, and Tailwind CSS.

## Features

- 🎯 **65+ AI Platforms**: Access ChatGPT, Claude, Gemini, Perplexity, and 60+ more AI platforms
- 🎨 **Clean UI**: Simple, gradient-free design inspired by Claude.ai
- 🖱️ **Drag & Drop**: Intuitive drag-and-drop interface to organize your LLMs
- 📊 **Multi-Column Layout**: View multiple AI platforms side-by-side
- 🏷️ **Category Filtering**: Filter by Major, Search, Coding, Chinese, Regional, and more
- 🚀 **Fast & Responsive**: Built with React and Vite for optimal performance

## Included AI Platforms

### Major AI Assistants
- ChatGPT, Claude, Google Gemini, Microsoft Copilot

### Search & Research
- Perplexity AI, You.com, Phind, Andi

### Coding AI
- Codeium, Tabnine, Replit AI, Cursor, GitHub Copilot

### Chinese AI Platforms
- ERNIE Bot, Tongyi Qianwen, ChatGLM, iFlytek Spark, Tiangong AI, SenseChat, ByteDance Doubao

### Open Source
- Meta AI, Mistral AI, DeepSeek, HuggingChat, LMSYS Chat, Ollama

### Creative AI
- Midjourney, DALL-E, Leonardo.ai, Playground AI, Stable Diffusion

### And 40+ more platforms across Specialized, Regional, Educational, Voice, and Productivity categories!

## Setup Instructions

### For GitHub Codespaces

1. **Create a new Codespace** or open an existing one

2. **Clone or create the project**:
   ```bash
   mkdir multi-llm-hub
   cd multi-llm-hub
   ```

3. **Create the following files** with the provided code:
   - `package.json`
   - `vite.config.js`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `index.html`
   - `src/main.jsx`
   - `src/App.jsx`
   - `src/index.css`

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Access the app**:
   - Codespaces will show a notification with a link to open the app
   - Or go to the "Ports" tab and click on the forwarded port 3000
   - The app will be available at `https://[your-codespace-url]-3000.app.github.dev`

### For Local Development

1. **Install Node.js** (v16 or higher)

2. **Clone the repository** and navigate to the project folder

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and go to `http://localhost:3000`

## Usage

1. **Browse AI Platforms**: Use the sidebar to explore 65+ AI platforms organized by category
2. **Filter by Category**: Click category buttons to filter platforms (Major, Search, Coding, etc.)
3. **Drag & Drop**: Drag any AI platform card from the sidebar to the main area
4. **Multi-Column View**: The layout automatically adjusts based on the number of platforms added
5. **Open in New Window**: Click the external link icon to open any platform in a separate window
6. **Remove Platforms**: Click the X button to remove a platform from the view

## Important Note: Browser Security Restrictions

Due to browser security policies (X-Frame-Options and Content-Security-Policy), most AI websites cannot be embedded directly in iframes. The app provides two solutions:

1. **Open in New Window**: Opens the AI platform in a properly sized popup window
2. **Open in New Tab**: Opens the AI platform in a new browser tab

This is a security feature implemented by the AI platforms themselves and cannot be bypassed from the client side.

## Project Structure

```
multi-llm-hub/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration
```

## Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **GitHub Codespaces**: Cloud development environment

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Contributing

Feel free to submit issues or pull requests to add more AI platforms or improve the interface!

## License


MIT License - feel free to use this project for personal or commercial purposes.
