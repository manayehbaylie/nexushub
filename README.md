# NexusHub – Smart Operations Management Portal

NexusHub is a full-stack operations management portal built with React, Tailwind CSS, Express, PostgreSQL, and JWT authentication.

## Project Structure

- `client/` — frontend application with React, Vite, Tailwind CSS, router, and services.
- `server/` — backend API with Express, authentication, validation, middleware, and PostgreSQL database support.
- `docs/` — project documentation, database schema, API reference, and architecture notes.
- `.env.example` — environment variable template.
- `package.json` — workspace scripts for frontend and backend.

## Getting Started

1. Install dependencies:
   - `npm install`
   - `npm run install:all`
2. Copy `.env.example` to `.env` and update values for your local environment.
3. Start the frontend and backend in separate terminals:
   - `npm run start:client`
   - `npm run start:server`

## Notes

- The client app loads API requests from `VITE_API_URL`.
- The server is configured to run on `PORT` and uses `DATABASE_URL` for PostgreSQL.
- Follow the step-by-step project generation plan in the repository docs.