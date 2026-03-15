# FutureSelf

> Talk to a photorealistic AI-generated future version of yourself before making major life decisions.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Overview

FutureSelf uses advanced AI to generate a photorealistic, aged version of you — complete with your voice, your context, and the wisdom of decades lived. Have the conversation before you commit.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Animations:** Framer Motion
- **Auth:** NextAuth.js (Google OAuth placeholder)

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero, features, testimonials, CTA |
| `/auth/signin` | Google OAuth sign-in |
| `/onboarding` | Multi-step wizard (photos, life context, voice) |
| `/dashboard` | Conversation history, stats, future self card |
| `/conversation/[id]` | Chat interface with your future self |
| `/explorer` | Multi-path branching life scenario visualizer |
| `/pricing` | Free / Pro / Lifetime comparison |
| `/settings` | Profile, subscription, preferences, data management |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Environment Variables

Create `.env.local` for auth (optional — app works without it):

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Design

- Dark mode by default with warm amber/gold accents
- Cinematic, slightly mysterious aesthetic
- Mobile-responsive
- Subtle Framer Motion animations throughout

## License

MIT
