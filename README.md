# QuestLog

A full-stack quest and task tracker dashboard built as a portfolio project.
Manage quests, track priorities, and monitor progress — styled like a game dashboard.

**Live demo:** [https://quest-log-two.vercel.app](https://quest-log-two.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Express](https://img.shields.io/badge/Express-4-gray?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)

---

## Features

- **JWT Authentication** — Register, login, and logout with secure HTTP-only cookies
- **Admin System** — Admin role with a dedicated dashboard to manage users and all quests
- **Dashboard** — Stats cards showing total, in-progress, completed, and high-priority quests
- **Quest CRUD** — Create, update status, and delete your own quests
- **Priority system** — Low / Medium / High priority with visual indicators
- **Category tagging** — Group quests by category (Raid, Story, Side Quest, etc.)
- **Status flow** — Move quests from To Do → In Progress → Done with one click
- **Dark UI** — Modern dark dashboard aesthetic with Tailwind CSS

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js 16 (App Router) + TypeScript |
| Styling    | Tailwind CSS 3                      |
| Backend    | Node.js + Express 4 + TypeScript    |
| Database   | MongoDB Atlas (via Mongoose 8)      |
| Auth       | JWT + HTTP-only cookies             |
| Deployment | Vercel (frontend) + Render (backend)|

---

## Project Structure

```
QuestLog/
├── frontend/                        # Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/page.tsx       # Login page
│   │   │   ├── register/page.tsx    # Register page
│   │   │   ├── admin/page.tsx       # Admin dashboard
│   │   │   ├── layout.tsx           # Root layout with Header
│   │   │   └── page.tsx             # Main dashboard
│   │   ├── components/
│   │   │   ├── layout/Header.tsx
│   │   │   ├── quest/QuestCard.tsx
│   │   │   ├── quest/QuestForm.tsx
│   │   │   └── ui/StatsCard.tsx
│   │   ├── context/AuthContext.tsx  # Global auth state
│   │   ├── lib/api.ts               # API client
│   │   └── types/index.ts
│   └── .env.local.example
│
└── backend/                         # Express API
    ├── src/
    │   ├── controllers/
    │   │   ├── auth.controller.ts
    │   │   ├── quest.controller.ts
    │   │   └── admin.controller.ts
    │   ├── middleware/
    │   │   └── auth.ts              # JWT verification + role guard
    │   ├── models/
    │   │   ├── User.ts
    │   │   └── Quest.ts
    │   ├── routes/
    │   │   ├── auth.routes.ts
    │   │   ├── quest.routes.ts
    │   │   └── admin.routes.ts
    │   ├── scripts/
    │   │   └── createAdmin.ts       # Seed admin user
    │   └── server.ts
    └── .env.example
```

---

## Getting Started (Local Development)

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas account (free tier)

### 1. Clone the repository

```bash
git clone https://github.com/Amitvaknin1/QuestLog.git
cd QuestLog
```

### 2. Set up the Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_ORIGIN=http://localhost:3000
```

```bash
npm run dev
# Backend runs on http://localhost:5000
```

### 3. Set up the Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
npm run dev
# Frontend runs on http://localhost:3000
```

### 4. Create the Admin user

In a separate terminal:

```bash
cd backend
npm run seed:admin
```

Default admin credentials:
- **Email:** `admin@questlog.com`
- **Password:** `Admin2302!`

---

## API Reference

### Auth

| Method | Endpoint              | Description              | Auth required |
|--------|-----------------------|--------------------------|---------------|
| POST   | `/api/auth/register`  | Register a new user      | No            |
| POST   | `/api/auth/login`     | Login and receive cookie | No            |
| POST   | `/api/auth/logout`    | Clear auth cookie        | Yes           |
| GET    | `/api/auth/me`        | Get current user info    | Yes           |

### Quests

| Method | Endpoint              | Description              | Auth required |
|--------|-----------------------|--------------------------|---------------|
| GET    | `/api/quests`         | Get all user quests      | Yes           |
| POST   | `/api/quests`         | Create a new quest       | Yes           |
| PATCH  | `/api/quests/:id`     | Update a quest           | Yes           |
| DELETE | `/api/quests/:id`     | Delete a quest           | Yes           |

### Admin

| Method | Endpoint                      | Description           | Auth required  |
|--------|-------------------------------|-----------------------|----------------|
| GET    | `/api/admin/users`            | Get all users         | Admin only     |
| GET    | `/api/admin/quests`           | Get all quests        | Admin only     |
| PATCH  | `/api/admin/users/:id/role`   | Change user role      | Admin only     |
| DELETE | `/api/admin/users/:id`        | Delete a user         | Admin only     |

---

## Deployment

| Service  | Platform | URL                                          |
|----------|----------|----------------------------------------------|
| Frontend | Vercel   | https://quest-log-two.vercel.app             |
| Backend  | Render   | https://questlog-backend-fncz.onrender.com   |
| Database | MongoDB Atlas | (cloud-hosted)                          |

> Note: The Render free tier spins down after inactivity. The first request after idle may take ~50 seconds.

---

## Future Features

- [ ] Quest filtering and search
- [ ] Drag-and-drop Kanban board
- [ ] XP and level system
- [ ] Character / profile management page
- [ ] Dark/light theme toggle
- [ ] Mobile-responsive sidebar

---

## Author

Built by **Amit Vaknin** as a fullstack portfolio project.

- GitHub: [@Amitvaknin1](https://github.com/Amitvaknin1)
