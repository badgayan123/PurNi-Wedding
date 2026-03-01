# Luxury AI-Powered Indian Wedding Website

A premium, cinematic wedding microsite with personalised WhatsApp invite automation and AI-powered hospitality.

## Features

- **Cinematic Frontend** – Hero, Our Story, Family, Events, Gallery, RSVP
- **AI Invite Generation** – OpenAI-powered personalised messages per guest
- **WhatsApp Delivery** – Meta Cloud API for invites, reminders, RSVP links
- **Admin Dashboard** – Guest list, RSVPs, invite tracking, bulk upload
- **MongoDB** – Guest & RSVP storage

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind, Framer Motion, React Hook Form, Lucide
- **Backend**: Node.js, Express, MongoDB
- **AI**: OpenAI API
- **WhatsApp**: Meta Cloud API

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI, OpenAI key, WhatsApp credentials
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL if backend runs elsewhere
npm run dev
```

### 3. MongoDB Atlas

Create a cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas) and add the connection string to `MONGODB_URI`.

### 4. OpenAI

Get an API key from [platform.openai.com](https://platform.openai.com) and add to `OPENAI_API_KEY`.

### 5. WhatsApp Cloud API

1. Create a Meta for Developers app
2. Add WhatsApp product
3. Get Phone Number ID and Access Token
4. Configure webhook URL for incoming messages (optional, for AI auto-responses)

## Guest List Format (Bulk Upload)

```
Name | Family Name | WhatsApp Number | Relation
Rajesh | Sharma | 9876543210 | Mama ji
```

## Deployment

- **Frontend**: Vercel (`vercel deploy`)
- **Backend**: Render / Railway – set env vars and `MONGODB_URI`
- Update `NEXT_PUBLIC_API_URL` and `FRONTEND_URL` for production

## Customisation

- **Couple names**: Edit `frontend/src/lib/wedding-config.ts` (Nitesh & Purnima / PurNi)
- **Wedding date**: Edit `Hero.tsx` WEDDING_DATE
- **Events**: Edit `Events.tsx` events array
- **Gallery**: Replace URLs in `Gallery.tsx` with your photos
- **Family**: Update `Family.tsx` with actual family members
