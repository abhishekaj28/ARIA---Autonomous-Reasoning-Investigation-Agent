# ARIA — Autonomous Reasoning & Investigation Agent

ARIA analyzes suspicious messages (SMS, WhatsApp, email text) for common Indian scam patterns and shows its reasoning step by step before giving a verdict: **SCAM**, **SUSPICIOUS** or **SAFE**.

Built for the Technocrats Elite 8.0 hackathon (AI for Real-World Impact + Cyber Security).

## Status

| Part | State |
|---|---|
| Express backend, SQLite logging, Swagger docs | Working |
| React frontend (Dashboard, Investigate, Analytics) | Working against the backend |
| Detection engine | **Rule-based**: regex patterns for urgency, credential requests, account threats, suspicious links and more |
| LLM reasoning (Claude API) | Planned, not implemented yet |
| Screenshot and voice input | Planned, not implemented yet |

## Stack

- **Backend:** Node.js, Express, better-sqlite3, Helmet, rate limiting, Swagger
- **Frontend:** React, TypeScript, Vite, Tailwind

## Run locally

```bash
# backend (http://localhost:5000)
cd backend
cp .env.example .env
npm install
npm run dev

# frontend (in a second terminal)
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` in the frontend if the backend is not on `http://localhost:5000/api`.

## API

| Endpoint | Description |
|---|---|
| `GET /api/health` | Health check |
| `POST /api/investigate` | Body `{ "message": "..." }`; returns reasoning steps and a verdict |
| `GET /api/stats` | Aggregate scan statistics |
| `GET /api/docs` | Swagger UI |

## Limitations

The rules were written by hand and have not been evaluated on a labelled dataset, so accuracy figures are not available. Evaluating the detector and adding an LLM step are the next milestones.

## Credits

The frontend was generated with Lovable by a teammate and wired to the backend by me.
