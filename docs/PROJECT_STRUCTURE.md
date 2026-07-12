# Project Structure

## Root
- `package.json`
- `.gitignore`
- `.env.example`
- `README.md`
- `docs/`
  - `API.md`
  - `DATABASE.md`
  - `PROJECT_STRUCTURE.md`

## frontend (`client/`)
- `package.json`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `src/`
  - `main.jsx`
  - `App.jsx`
  - `index.css`
  - `assets/`
  - `components/`
    - `common/`
    - `dashboard/`
    - `layout/`
  - `context/`
  - `hooks/`
  - `pages/`
    - `auth/`
    - `dashboard/`
    - `members/`
    - `requests/`
    - `resources/`
    - `profile/`
    - `search/`
    - `statistics/`
  - `routes/`
  - `services/`
  - `utils/`

## backend (`server/`)
- `package.json`
- `app.js`
- `server.js`
- `config/`
  - `db.js`
  - `jwt.js`
- `controllers/`
- `middleware/`
- `models/`
- `routes/`
- `services/`
- `database/`
  - `schema.sql`
  - `seed.sql`
  - `migrations/`
- `utils/`

This repository uses a monorepo-style layout with separate frontend and backend packages.
