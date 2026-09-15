# GCC Advisor

Interactive, inquiry-driven marketing site for a Global Capability Center (GCC) advisory firm — Next.js, MongoDB, Framer Motion, and a secure admin panel for content and leads.

## Quick start

```bash
npm install
cp .env.example .env.local
# Start MongoDB locally (optional — site falls back to seeded content)
npm run seed   # when MongoDB is available
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin: [http://localhost:3000/admin](http://localhost:3000/admin)  
Default credentials (from `.env.local`): `admin@gccadvisor.com` / `ChangeMe123!`

## Stack

- Next.js App Router (React) + Tailwind CSS
- Framer Motion for scroll reveals and counters
- MongoDB + Mongoose (content + leads + chat sessions)
- Auth.js credentials for single admin login
- Rule-based site chat (no LLM)

## Features

- Homepage with trust metrics, connected modules, CTAs
- Service pages, engagement model comparison + selector
- Trust-pop enquiry, contact form, chat assistant (source-tagged leads)
- Insights, customers/case studies, about, FAQ
- Admin CMS + unified leads inbox

## Environment

See `.env.example` for `MONGODB_URI`, `AUTH_SECRET`, admin bootstrap, and optional `NEXT_PUBLIC_CALENDLY_URL`.
# Vertara-Global
