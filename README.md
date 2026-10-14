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

## Contact Form CAPTCHA Architecture

A custom, secure alphanumeric CAPTCHA protects the Contact Us form against automated bot submissions and spam while preserving high conversion and seamless user experience.

### 1. Challenge Generation & Delivery
- **Endpoint**: `GET /api/captcha`
- **Challenge Format**: 5 uppercase alphanumeric characters (`A7K2P`), excluding ambiguous characters (`0`, `O`, `1`, `I`, `L`).
- **Cryptographic Security**: Generated using `node:crypto.randomInt` and `crypto.randomBytes`.
- **Anti-Scraping / Anti-OCR**: Rendered as a customized vector SVG image with subtle wave lines, noise dots, character rotation, and vertical jitter. The plaintext answer is **never** transmitted to the client in JSON, DOM attributes, or props.

### 2. Challenge Storage & TTL
- **Shared Storage**: Challenges are persisted in MongoDB via the `CaptchaChallenge` Mongoose model.
- **Automatic Purging (TTL)**: Configured with a 5-minute MongoDB TTL index (`expires: 0` on `expiresAt`).
- **High Availability**: Includes an automated in-memory Map fallback for local development or during transient database connection recovery.
- **Hashed Answers**: Answers are stored salted and hashed via `SHA-256`. The plaintext answer is never kept in the database.

### 3. Server-Side Verification (`/api/leads`)
- **Single-Use Invalidation**: Validated challenges are immediately deleted upon successful verification to prevent replay attacks.
- **Attempt Limiting**: A single challenge allows a maximum of 3 attempts before being permanently invalidated.
- **Brute-Force Rate Limiting**: Client IP addresses are monitored; repeated failed attempts trigger a 5-minute cooldown.
- **Strict Server Enforcement**: Contact submissions directly to `/api/leads` that lack a valid, unexpired CAPTCHA token are rejected with HTTP 400 before saving any lead data or triggering founder email notifications.

