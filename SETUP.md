# EduConsult Platform — Setup Guide

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)

---

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random string (min 32 chars) |
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | From Cloudinary dashboard |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` (dev) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password (min 8 chars) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number without `+` |

---

## 3. MongoDB Setup

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Create free cluster
2. Create a database user
3. Whitelist your IP (or `0.0.0.0/0` for development)
4. Copy the connection string into `MONGODB_URI`

---

## 4. Cloudinary Setup

1. Go to [cloudinary.com](https://cloudinary.com) → Sign up free
2. From the dashboard, copy: Cloud Name, API Key, API Secret
3. Paste into `.env.local`

---

## 5. Seed the Database

Start the dev server first, then run the seed endpoint:

```bash
npm run dev
```

In a new terminal:

```bash
curl -X POST "http://localhost:3000/api/seed?key=seed-edu-2024"
```

This creates:
- Admin user (email/password from `.env.local`)
- 6 default services
- 4 team members
- 2 sample blog posts
- Default site settings

---

## 6. Start Development Server

```bash
npm run dev
```

Visit:
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

---

## 7. Admin Login

Use the credentials from your `.env.local`:
- **Email**: value of `ADMIN_EMAIL`
- **Password**: value of `ADMIN_PASSWORD`

Default: `admin@educonsult.ae` / `Admin@2024!`

---

## 8. Add Your Event Photos

Place your event photos in `public/images/events/` with these exact filenames:

| Filename | Content |
|---|---|
| `panel-full-stage.jpg` | Wide BSME stage shot (all 4 panelists) |
| `panel-discussion.jpg` | Panel in discussion |
| `panel-closeup.jpg` | Close-up of Shamaila at microphone |
| `panel-group-photo.jpg` | Post-panel group selfie |
| `panel-stage-standing.jpg` | All 4 panelists standing |
| `ib-conference-presenting.jpg` | Shamaila presenting (red suit) |
| `ib-conference-room.jpg` | Full room of attendees |
| `ib-conference-slides.jpg` | Session title slide visible |
| `ib-conference-portrait.jpg` | Portrait at IB banner |

Then place the team/founder photo at:
- `public/images/team/shamaila-shah.jpg`

---

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public website pages
│   │   ├── page.tsx       # Homepage
│   │   ├── about/
│   │   ├── services/[slug]/
│   │   ├── blog/[slug]/
│   │   ├── contact/
│   │   ├── case-studies/
│   │   ├── school-improvement/
│   │   └── speaking/
│   ├── admin/             # Admin panel (protected)
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── services/
│   │   ├── team/
│   │   ├── blog/
│   │   ├── leads/
│   │   ├── media/
│   │   ├── settings/
│   │   └── case-studies/
│   └── api/               # REST API routes
├── components/
│   ├── public/            # Website components
│   └── admin/             # Admin panel components
├── lib/                   # DB, auth, utilities
├── models/                # Mongoose models
└── types/                 # TypeScript interfaces
```
