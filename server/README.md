# Auth MVC Backend (scaffold)

Drop this folder on a Node host, install dependencies, and configure environment variables.

## Quick start
1. Copy `.env.example` -> `.env` and set values.
2. `npm install`
3. `npm run dev` (requires nodemon) or `npm start`

## Endpoints
- GET /api/posts        (protected)
- POST /api/posts       (protected)

The backend expects incoming requests to include the JWT issued by your Next.js app (via `GET /api/auth/token`) in the Authorization header:
`Authorization: Bearer <token>`
The token is verified using `JWT_SECRET`. The payload must contain either `id` (preferred), `_id`, or `email`. If only `email` is present, the backend will resolve the user id from MongoDB.
