# QuestLog

A full-stack quest and task tracker dashboard built as a portfolio project.
Manage quests, track priorities, and monitor progress — styled like a game dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)

---

## Features

- **Dashboard** — Stats cards showing total, in-progress, completed, and high-priority quests
- **Quest CRUD** — Create, read, update status, and delete quests via a clean API
- **Priority system** — Low / Medium / High priority with visual indicators
- **Category tagging** — Group quests by category (Raid, Story, Side Quest, etc.)
- **Status flow** — Move quests from To Do → In Progress → Done with one click
- **Dark UI** — Modern dark dashboard aesthetic with Tailwind CSS
- **REST API** — Clean Next.js App Router API routes with error handling and validation

---

## Tech Stack

| Layer      | Technology                     |
|------------|-------------------------------|
| Framework  | Next.js 16 (App Router)       |
| Language   | TypeScript 5                  |
| Styling    | Tailwind CSS 3                |
| Database   | MongoDB (via MongoDB Atlas)   |
| ODM        | Mongoose 8                    |
| Linting    | ESLint (next/core-web-vitals) |

---

## Folder Structure

```
src/
├── app/
│   ├── api/
│   │   └── quests/
│   │       ├── route.ts          # GET /api/quests, POST /api/quests
│   │       └── [id]/
│   │           └── route.ts      # PATCH /api/quests/:id, DELETE /api/quests/:id
│   ├── globals.css
│   ├── layout.tsx                # Root layout with Header
│   └── page.tsx                  # Dashboard home page
├── components/
│   ├── layout/
│   │   └── Header.tsx
│   ├── quest/
│   │   ├── QuestCard.tsx
│   │   └── QuestForm.tsx
│   └── ui/
│       └── StatsCard.tsx
├── lib/
│   └── mongodb.ts                # Cached Mongoose connection
├── models/
│   ├── Quest.ts
│   ├── User.ts
│   └── Character.ts
└── types/
    └── index.ts                  # Shared TypeScript types
```

---

## Environment Variables

Create a file called `.env.local` in the project root (it is already in `.gitignore` — never commit it):

```env
MONGODB_URI=your_mongodb_connection_string_here
```

See `.env.local.example` for reference.

---

## MongoDB Setup

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Create a new **Cluster** (the free M0 tier is enough)
3. Under **Database Access**, create a database user with read/write permissions
4. Under **Network Access**, add your IP address (or `0.0.0.0/0` for development)
5. Click **Connect → Connect your application**, copy the connection string
6. Replace `<password>` with your database user's password
7. Paste the string into your `.env.local` as `MONGODB_URI`

The database and `quests` collection will be created automatically on first insert.

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- A MongoDB Atlas account (free tier)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/QuestLog.git
cd QuestLog

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your MONGODB_URI

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start development server on :3000  |
| `npm run build` | Build for production               |
| `npm run start` | Start production server            |
| `npm run lint`  | Run ESLint                         |

---

## API Reference

| Method   | Endpoint              | Description            |
|----------|-----------------------|------------------------|
| `GET`    | `/api/quests`         | Get all quests         |
| `POST`   | `/api/quests`         | Create a new quest     |
| `PATCH`  | `/api/quests/:id`     | Update a quest         |
| `DELETE` | `/api/quests/:id`     | Delete a quest         |

### Example — Create a Quest

```bash
curl -X POST http://localhost:3000/api/quests \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Defeat the Dragon",
    "description": "Find and defeat the fire dragon in the Eastern Mountains.",
    "status": "todo",
    "priority": "high",
    "category": "Main Story"
  }'
```

---

## Push to GitHub

```bash
# 1. Create a new repository on github.com (don't add README or .gitignore — the project already has them)

# 2. Add the remote
git remote add origin https://github.com/your-username/QuestLog.git

# 3. Rename branch to main and push
git branch -M main
git push -u origin main
```

---

## Future Features

- [ ] User authentication (NextAuth.js)
- [ ] Character / profile management page
- [ ] Quest filtering and search
- [ ] Drag-and-drop status board (Kanban view)
- [ ] XP and level system
- [ ] Quest categories management
- [ ] Dark/light theme toggle
- [ ] Mobile-responsive sidebar

---

## Screenshots

> _Add screenshots here after running the app locally_

---

## Author

Built by **vakamiti** as a fullstack portfolio project.

- GitHub: [@your-username](https://github.com/your-username)
