# DUCERE — AI-Powered Student Success Platform

**DUCERE** is a production-ready Next.js 14 application that integrates mental wellness tracking, AI-adaptive study planning, employability skill development, and career niche alignment for students.

---

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js** ≥ 18.17  → [nodejs.org/en/download](https://nodejs.org/en/download)
- **MongoDB** (local or [MongoDB Atlas](https://cloud.mongodb.com))

### 2. Install Dependencies

```bash
cd "C:\Users\Aatma\Videos\DUCERE"
npm install
```

### 3. Configure Environment Variables

Copy the example file and fill in your values:

```bash
copy .env.local.example .env.local
```

Edit `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/ducere
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-change-this
```

Generate a secure `NEXTAUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Seed the Database (Optional but Recommended)

Creates demo accounts, sample wellness logs, study plans, skill profiles, blog posts, and admin configs:

```bash
npx ts-node --project tsconfig.node.json scripts/seed.ts
```

**Demo accounts** (password: `password123`):
| Role    | Email                     |
|---------|---------------------------|
| Admin   | admin@ducere.app          |
| Mentor  | mentor@ducere.app         |
| Student | student@ducere.app        |

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
DUCERE/
├── app/
│   ├── (public)            # Home, About, Features, Pricing, Blog, Contact
│   ├── login/              # Auth pages
│   ├── register/
│   ├── student/            # Student portal (7 pages)
│   │   ├── dashboard/
│   │   ├── wellness/
│   │   ├── study-plan/
│   │   ├── skills/
│   │   ├── career/
│   │   ├── reports/
│   │   └── feedback/
│   ├── mentor/             # Mentor portal (3 pages)
│   │   ├── students/
│   │   ├── analytics/
│   │   └── messaging/
│   ├── admin/              # Admin portal (4 pages)
│   │   ├── analytics/
│   │   ├── research/
│   │   ├── data-export/
│   │   └── config/         # Super-Control Panel
│   └── api/                # All API routes
├── components/
│   └── layout/             # Navbar, Footer, Sidebar, Providers
├── lib/
│   ├── db.ts               # MongoDB connection
│   ├── auth.ts             # NextAuth config + RBAC
│   ├── ai.ts               # Rule-based AI engine
│   └── validators.ts       # Zod schemas
├── models/                 # 8 Mongoose models
├── scripts/
│   └── seed.ts             # Database seed script
└── middleware.ts            # Auth + role protection
```

---

## 🧠 Tech Stack

| Layer        | Technology                                          |
|--------------|-----------------------------------------------------|
| Framework    | Next.js 14 (App Router)                             |
| Styling      | Tailwind CSS + custom glassmorphism utilities       |
| Animations   | Framer Motion                                       |
| Charts       | Recharts (Area, Line, Bar, Radial, Radar, Pie)      |
| Auth         | NextAuth.js (JWT + Credentials)                     |
| Database     | MongoDB + Mongoose                                   |
| Validation   | Zod                                                 |
| AI Engine    | Rule-based (burnout prediction, study plan gen, skill gap, feedback analysis) |
| Forms        | Native React + react-hook-form                      |
| Notifications| Sonner (toast)                                      |

---

## 🔐 Role-Based Access Control

| Route Prefix    | Role Required |
|-----------------|---------------|
| `/student/*`    | `student`     |
| `/mentor/*`     | `mentor`      |
| `/admin/*`      | `admin`       |
| `/api/mentor/*` | `mentor`      |
| `/api/admin/*`  | `admin`       |

---

## 🤖 AI Features (Rule-Based Engine)

All AI runs **without external API keys** out of the box:

- **Burnout Prediction** — Composite score from stress, sleep deficit, mood, and study hours
- **Adaptive Study Plans** — Weekly plans generated based on niche, burnout score, and intensity level
- **Skill Gap Analysis** — Compares user skills against role profiles for 50+ job roles
- **Feedback Sentiment** — Keyword-based sentiment analysis with theme extraction

To upgrade to OpenAI/Gemini, add your key to `.env.local` and update `lib/ai.ts`.

---

## 🌐 Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: DUCERE platform"
git remote add origin https://github.com/YOUR_USERNAME/DUCERE.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Add Environment Variables:
   - `MONGODB_URI` → your MongoDB Atlas connection string
   - `NEXTAUTH_URL` → `https://your-ducere-domain.vercel.app`
   - `NEXTAUTH_SECRET` → your 32-byte hex secret
4. Click **Deploy** ✅

### 3. MongoDB Atlas Setup

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free M0 cluster
3. Add `0.0.0.0/0` to IP allowlist (for Vercel Serverless)
4. Copy the connection string to `MONGODB_URI`

---

## 📊 Database Schema

| Model          | Purpose                                     |
|----------------|---------------------------------------------|
| `User`         | Auth, roles, mentor assignment, niche       |
| `WellnessLog`  | Daily mood/stress/sleep/study + burnout     |
| `StudyPlan`    | AI-generated weekly plans with tasks        |
| `SkillProfile` | Skills, gaps, roadmap, certifications       |
| `CareerProfile`| Preferred roles, resume, interviews, jobs   |
| `Feedback`     | Weekly feedback + AI sentiment analysis     |
| `BlogPost`     | Articles with categories and tags           |
| `AdminConfig`  | Super-Control Panel key-value store         |

---

## 📈 Scalability Notes

- **Connection pooling**: MongoDB connection cached via global singleton in `lib/db.ts`
- **Stateless auth**: JWT-based sessions work across any number of serverless instances
- **CDN-ready**: All static assets and Next.js optimized images served via CDN on Vercel
- **Incremental AI upgrade**: Rule-based AI can be swapped for OpenAI/Gemini per function

---

## 📝 API Reference

| Method | Endpoint                       | Auth    | Description                          |
|--------|--------------------------------|---------|--------------------------------------|
| POST   | `/api/auth/register`           | Public  | Create account                       |
| POST   | `/api/wellness/log`            | Student | Log daily wellness + burnout calc    |
| GET    | `/api/wellness/log`            | Student | Get weekly wellness summary          |
| POST   | `/api/study-plan/generate`     | Student | Generate AI study plan               |
| GET    | `/api/study-plan`              | Student | Get current study plan               |
| PATCH  | `/api/study-plan`              | Student | Mark task complete                   |
| GET    | `/api/skills`                  | Student | Get skill profile                    |
| POST   | `/api/skills`                  | Student | Run skill gap analysis               |
| GET    | `/api/career`                  | Student | Get career profile                   |
| POST   | `/api/career`                  | Student | Update career profile                |
| POST   | `/api/feedback`                | Student | Submit feedback + AI analysis        |
| GET    | `/api/mentor/students`         | Mentor  | Get assigned students                |
| GET    | `/api/admin/analytics`         | Admin   | Platform-wide analytics              |
| GET    | `/api/admin/config`            | Admin   | Get all config                       |
| POST   | `/api/admin/config`            | Admin   | Create/update config entry           |
| DELETE | `/api/admin/config`            | Admin   | Delete config entry                  |

---

## 🛡️ Security

- Passwords hashed with bcrypt (12 rounds)
- JWT sessions with configurable expiry (30 days)
- Middleware-enforced RBAC on all private routes
- Zod input validation on all API endpoints
- Environment variables never exposed to client

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License © 2025 DUCERE
