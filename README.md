# 📖 Guestbook - React + NestJS + Supabase

A full-stack guestbook application with a React frontend, NestJS backend, and Supabase database.

## 🚀 Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Beautiful, responsive UI with modern design
- ✅ RESTful API with NestJS
- ✅ PostgreSQL database via Supabase
- ✅ Deployed on Vercel as serverless functions
- ✅ Real-time data synchronization

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: NestJS (TypeScript)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Styling**: Custom CSS with modern design

## 📁 Project Structure

```
rns/
├── backend/              # NestJS API
│   ├── api/              # Vercel serverless entry point
│   │   └── index.ts
│   └── src/              # Application code
│       ├── main.ts
│       ├── app.module.ts
│       ├── guestbook.controller.ts
│       └── guestbook.service.ts
├── frontend/             # React/Vite app
│   ├── src/
│   │   ├── App.jsx       # Main guestbook component
│   │   ├── App.css       # Styles
│   │   └── main.jsx
│   └── index.html
├── package.json          # Root build scripts
├── vercel.json           # Vercel deployment config
├── SETUP.md              # Local development guide
├── TESTING.md            # Testing checklist
└── DEPLOYMENT.md         # Vercel deployment guide

## 🏃 Quick Start

### Prerequisites

- Node.js 20.x or higher
- A Supabase project with guestbook table
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd rns
   ```

2. **Set up environment variables**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Add your Supabase credentials to .env
   
   # Frontend
   cd ../frontend
   cp .env.local.example .env.local
   ```

3. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

4. **Start the backend**
   ```bash
   cd backend
   npm run start:dev
   # Runs on http://localhost:3000
   ```

5. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   # Runs on http://localhost:5173
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

### Supabase Setup

Run this SQL in your Supabase SQL Editor:

```sql
create table guestbook (
  id bigint primary key generated always as identity,
  name text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table guestbook enable row level security;

-- Allow public access
create policy "Allow public access to guestbook"
on guestbook for all
using (true)
with check (true);
```

## 🚢 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions to Vercel.

**Quick Deploy:**
1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy!

## 📚 Documentation

- [SETUP.md](SETUP.md) - Complete local setup guide
- [TESTING.md](TESTING.md) - Testing checklist for all features
- [DEPLOYMENT.md](DEPLOYMENT.md) - Vercel deployment guide

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/guestbook` | Get all entries |
| POST | `/api/guestbook` | Create new entry |
| PUT | `/api/guestbook/:id` | Update entry |
| DELETE | `/api/guestbook/:id` | Delete entry |

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

## 📝 License

ISC

## 👨‍💻 Author

Built with React, NestJS, and Supabase
