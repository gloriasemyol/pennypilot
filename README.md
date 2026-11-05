# 💸 PennyPilot: Personal Finance Tracker

Your money's co-pilot. A full-stack MERN app to track income and expenses, set a monthly budget, and understand spending through interactive charts.

🔗 **Live demo:** https://pennypilot-umber.vercel.app
⚙️ **API:** https://pennypilot-api-zen6.onrender.com/api/health

> ⏳ The backend runs on a free Render plan, so the first request after inactivity can take ~30–60 seconds to wake up.

## 📸 Screenshots

| Dashboard | Mobile |
|---|---|
| ![Dashboard](screenshots/dashboard.png) | ![Mobile](screenshots/mobile.png) |

| Transactions | Login |
|---|---|
| ![Transactions](screenshots/transactions.png) | ![Login](screenshots/login.png) |

## ✨ Features

- 🔐 Secure registration and login with JWT and bcrypt-hashed passwords
- ➕ Add, view and delete income and expense transactions
- 🔍 Filter by type, category and date range
- 📊 Pie chart (spending by category) and bar chart (6-month income vs expense trends)
- 💰 Live balance, income and expense summary cards
- 🎯 Monthly budget tracker with progress bar
- ⚡ Optimistic UI updates, loading skeletons and toast notifications
- 📱 Fully responsive, glassmorphism dark UI

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, React Router, Context API, Axios |
| Charts and UI | Recharts, Framer Motion, Lucide Icons, React Hot Toast |
| Backend | Node.js, Express.js, JWT, bcryptjs |
| Database | MongoDB Atlas, Mongoose |
| Deployment | Vercel (frontend), Render (backend) |

## 🏗️ Project Structure

```
pennypilot/
├── client/   # React frontend
└── server/   # Express API
```

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Create account | No |
| POST | /api/auth/login | Log in | No |
| GET | /api/auth/me | Get current user | Yes |
| GET | /api/transactions | List my transactions | Yes |
| POST | /api/transactions | Add a transaction | Yes |
| DELETE | /api/transactions/:id | Delete a transaction | Yes |

## 🚀 Run Locally

**1. Clone**
```bash
git clone https://github.com/gloriasemyol/pennypilot.git
cd pennypilot
```

**2. Backend**
```bash
cd server
npm install
cp .env.example .env   # then fill in your values
npm run dev
```

**3. Frontend** (in a new terminal)
```bash
cd client
npm install
npm run dev
```
Open http://localhost:5173

## ☁️ Deployment

- **Backend (Render):** root directory `server`, build `npm install`, start `npm start`. Env vars: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`.
- **Frontend (Vercel):** root directory `client`. Env var: `VITE_API_URL` (the Render URL, without `/api`).

## 🔮 Future Improvements

- Export transactions as CSV/PDF
- Recurring transactions
- Edit transactions
- Monthly email reports

## 👩‍💻 Author

**Gloria** · [GitHub](https://github.com/gloriasemyol)
