# AI Interview Prep Platform

This repository contains a two-part interview preparation app:

- `Backend/` provides the Express API, authentication, interview report generation, and resume PDF creation.
- `Frontend/` provides the Vite + React single-page app for login, registration, and the protected interview workflow.

## Project Structure

```text
Backend/
Frontend/
```

The frontend and backend are separate packages, so install and run them independently.

## Requirements

- Node.js 18+ recommended
- MongoDB available locally or through a hosted connection
- A browser environment for the frontend dev server

## Setup

### 1. Install dependencies

Run these commands from the repository root:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file inside `Backend/` and add the values your deployment needs. Do not commit secrets to the repository.

Common backend variables used by the app include:

- `MONGO_URI`
- `JWT_SECRET`
- `GOOGLE_GENAI_API_KEY`

If you need additional service-specific values, keep them local or in your deployment platform's secret store.

### 3. Start the backend

```bash
cd Backend
npm run dev
```

The backend listens on port `3000` and is configured for requests from the frontend running on `http://localhost:5173`.

### 4. Start the frontend

```bash
cd Frontend
npm run dev
```

## Available Scripts

### Backend

- `npm run dev` - starts the API with Nodemon

### Frontend

- `npm run dev` - starts the Vite dev server
- `npm run build` - builds the app for production
- `npm run lint` - runs Oxlint
- `npm run preview` - previews the production build locally

## API Overview

The backend exposes these main routes:

- `POST /api/auth/register` - create a new account
- `POST /api/auth/login` - sign in
- `GET /api/auth/logout` - clear the current session
- `GET /api/auth/get-me` - get the authenticated user
- `POST /api/interview/` - generate an interview report from resume, self-description, and job description
- `GET /api/interview/` - list the signed-in user's interview reports
- `GET /api/interview/report/:interviewId` - fetch a specific report
- `POST /api/interview/resume/pdf/:interviewReportId` - generate a resume PDF

## Notes

- The backend uses cookies, JWT authentication, MongoDB, file uploads, and AI-assisted report generation.
- Do not place API keys, database credentials, or other private values in the repository.
- On startup, the backend currently connects to the database and triggers a sample interview report generation flow.

## Frontend

The frontend is a React SPA built with Vite and Sass. It includes auth pages, protected routes, and interview-related screens under `Frontend/src/features/`.

## License

No license has been specified yet.