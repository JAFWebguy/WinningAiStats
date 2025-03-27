# AI Chatbot Market Share Dashboard

A real-time dashboard tracking market share and growth metrics for AI chatbots and language models.

## Features

- Real-time market share tracking
- Platform comparison tool
- Historical data visualization
- AI-powered market insights
- WebSocket-based live updates

## Tech Stack

- Frontend: React, Vite, TailwindCSS, shadcn/ui
- Backend: Node.js, Express
- Database: PostgreSQL (via Neon)
- Real-time: WebSocket
- AI Integration: OpenAI API

## Getting Started

1. Clone the repository
```bash
git clone [your-repo-url]
cd WinningAiStats
```

2. Install dependencies
```bash
npm install
cd client && npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database and OpenAI API credentials
```

4. Start the development server
```bash
npm run dev
```

5. Visit http://localhost:3000

## Deployment

This project is configured for deployment on Vercel. See `vercel.json` for the configuration.

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API key for insights generation
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment setting 