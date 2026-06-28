# 🔐 Authentication Project

A full-stack authentication system built with the MERN stack, featuring secure JWT-based auth, email verification, and password reset via Nodemailer.

🌐 **Live Demo:** [https://authentication-project-jphg.onrender.com](https://authentication-project-jphg.onrender.com)

---

## ✨ Features

- **User Sign Up** — Register with name, email, and password
- **Email Verification** — 6-digit OTP sent via Gmail SMTP; account activates on successful verification
- **Secure Login / Logout** — JWT stored in an `httpOnly` cookie (7-day expiry)
- **Forgot Password** — Sends a time-limited reset link to the registered email
- **Reset Password** — Token-validated password update with success email confirmation
- **Protected Routes** — Frontend guards redirect unauthenticated or unverified users
- **Persistent Auth** — `checkAuth` on app load restores session from cookie
- **Password Strength Meter** — Real-time visual feedback during sign up
- **Animated UI** — Floating shape background with Framer Motion animations

---

## 🛠️ Tech Stack

### Backend
| Package | Purpose |
|---|---|
| Express.js v5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT generation & verification |
| Nodemailer | Transactional emails via Gmail SMTP |
| cookie-parser | Parse `httpOnly` JWT cookies |
| dotenv | Environment variable management |
| cors | Cross-origin request handling |

### Frontend
| Package | Purpose |
|---|---|
| React 19 + Vite | UI framework & build tool |
| React Router DOM v7 | Client-side routing |
| Zustand | Global auth state management |
| Axios | HTTP client (with credentials) |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations |
| react-hot-toast | Toast notifications |
| lucide-react | Icon library |

---

## 📁 Project Structure

```
Authentication_Project/
├── backend/
│   ├── DB/
│   │   └── connectDB.js          # MongoDB connection
│   ├── Email/
│   │   ├── email.config.js       # Nodemailer transporter (Gmail SMTP)
│   │   ├── emailTemplates.js     # HTML email templates
│   │   └── emails.js             # Email sender functions
│   ├── Routes/
│   │   └── authRoutes.js         # Auth API route definitions
│   ├── controllers/
│   │   └── authController.js     # Route handler logic
│   ├── middleware/
│   │   └── verifyToken.js        # JWT auth middleware
│   ├── models/
│   │   └── userModel.js          # Mongoose User schema
│   ├── utils/
│   │   └── generateTokenAndSetCookie.js  # JWT creation & cookie setter
│   └── index.js                  # Express app entry point
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── components/
│       │   ├── FloatingShape.jsx         # Animated background blobs
│       │   ├── Input.jsx                 # Reusable input component
│       │   ├── LoadingSpinner.jsx        # Full-page loader
│       │   └── PasswordStrengthMeter.jsx # Real-time password strength UI
│       ├── pages/
│       │   ├── SignUpPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── EmailVerificationPage.jsx
│       │   ├── ForgotPasswordPage.jsx
│       │   ├── DashboardPage.jsx
│       │   └── TestPage.jsx
│       ├── store/
│       │   └── authStore.js      # Zustand store (all auth actions)
│       ├── utils/
│       │   └── date.js           # Date formatting helper
│       └── App.jsx               # Routes + protected route guards
│
└── package.json                  # Root scripts (build, start, dev)
```

---

## 🔌 API Endpoints

Base URL: `/api/auth`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/check-auth` | ✅ | Verify active session & return user |
| `POST` | `/signup` | ❌ | Register a new user |
| `POST` | `/login` | ❌ | Login and set JWT cookie |
| `POST` | `/logout` | ❌ | Clear JWT cookie |
| `POST` | `/verify-email` | ❌ | Verify 6-digit OTP |
| `POST` | `/forgot-password` | ❌ | Send password reset link to email |
| `POST` | `/reset-password/:token` | ❌ | Reset password using token |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Email (Gmail SMTP)
EMAIL=your_gmail_address@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# Client URL (used in password reset emails)
CLIENT_URL=http://localhost:5173
```

> **Note:** Use a Gmail **App Password** (not your account password). Enable 2FA on your Google account, then generate an App Password under Google Account → Security → App Passwords.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Gmail account with App Password configured

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/your-username/authentication-project.git
cd authentication-project

# 2. Install all dependencies (root + frontend)
npm run build

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# 4. Start development server
npm run dev
```

The backend runs on `http://localhost:5000` and the frontend dev server on `http://localhost:5173`.

### Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start backend with nodemon (development) |
| `npm run start` | Start backend in production mode |
| `npm run build` | Install all deps and build frontend for production |

---

## 🔒 Security Highlights

- Passwords hashed with **bcryptjs** (salt rounds: 10)
- JWT stored in **httpOnly, Secure, SameSite=Strict** cookies — not accessible via JavaScript
- Email verification tokens expire in **24 hours**
- Password reset tokens expire in **1 hour**
- Token cleared from DB immediately after successful password reset

---

## 📧 Email Flows

| Trigger | Email Sent |
|---|---|
| Sign Up | 6-digit verification OTP |
| Email Verified | Welcome email |
| Forgot Password | Password reset link |
| Password Reset | Reset success confirmation |

---

## 🧭 Frontend Routes

| Path | Page | Access |
|---|---|---|
| `/` | Dashboard | Protected (authenticated + verified) |
| `/signup` | Sign Up | Redirects if already logged in |
| `/login` | Login | Redirects if already logged in |
| `/verify-email` | Email Verification | Public |
| `/forgot-password` | Forgot Password | Redirects if already logged in |
| `/reset-password/:token` | Reset Password | Public |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
