# AI Image Generator

This project is now fully frontend-hosted with Next.js App Router and Next.js API routes.
You do not need a separate Express backend domain to run or deploy AI features.

## Features

- Ingredient recognition
- Image creator
- Image analysis
- Chatbot

All AI calls are handled by server routes under:

- `src/app/api/authentication/ingredients/route.ts`
- `src/app/api/authentication/imageCreator/route.ts`
- `src/app/api/authentication/analysis/route.ts`
- `src/app/api/authentication/chatbot/route.ts`

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
HF_TOKEN=your_huggingface_token
```

3. Start dev server:

```bash
npm run dev
```

## Deploy to Vercel

1. Import this frontend project to Vercel.
2. Add environment variable:

- `HF_TOKEN` = your Hugging Face token

3. Deploy.

No backend URL or CORS setup is required with this architecture.
