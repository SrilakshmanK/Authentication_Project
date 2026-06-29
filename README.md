# 🔐 Authentication & User Management System

A production-ready full-stack authentication system built with the **MERN Stack**, featuring secure JWT authentication, email verification, password recovery, HTTP-only cookie sessions, and transactional email delivery powered by **Brevo**.

🌐 **Live Demo:** https://authentication-project-jphg.onrender.com

📂 **GitHub Repository:** https://github.com/SrilakshmanK/Authentication_Project

---

# ✨ Features

* 🔐 Secure User Registration
* 📧 Email Verification using 6-digit OTP
* 🔑 JWT Authentication with HTTP-only Cookies
* 🚪 Secure Login & Logout
* 🔒 Forgot Password with Secure Reset Link
* ✅ Password Reset Confirmation Email
* 🛡️ Protected Routes
* ♻️ Persistent Authentication using `checkAuth`
* 🔐 Password Hashing with bcrypt
* 📬 Transactional Emails powered by Brevo
* 🎨 Modern Animated UI with Framer Motion
* 📱 Responsive Design

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* React Router DOM
* Zustand
* Axios
* Tailwind CSS
* Framer Motion
* React Hot Toast
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* Brevo Transactional Email API
* cookie-parser
* dotenv
* cors

---

# 📁 Project Structure

```
Authentication_Project/
│
├── backend/
│   ├── DB/
│   │   └── connectDB.js
│   │
│   ├── Email/
│   │   ├── email.config.js
│   │   ├── emailTemplates.js
│   │   └── emails.js
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   └── verifyToken.js
│   │
│   ├── models/
│   │   └── userModel.js
│   │
│   ├── Routes/
│   │   └── authRoutes.js
│   │
│   ├── utils/
│   │   └── generateTokenAndSetCookie.js
│   │
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   └── public/
│
└── package.json
```

---

# 🔌 API Endpoints

Base URL

```
/api/auth
```

| Method | Endpoint                 | Description               |
| ------ | ------------------------ | ------------------------- |
| GET    | `/check-auth`            | Check authenticated user  |
| POST   | `/signup`                | Register a new account    |
| POST   | `/login`                 | Login user                |
| POST   | `/logout`                | Logout user               |
| POST   | `/verify-email`          | Verify email using OTP    |
| POST   | `/forgot-password`       | Send password reset email |
| POST   | `/reset-password/:token` | Reset password            |

---

# 📧 Email Workflow

### Sign Up

```
User
   │
   ▼
Register Account
   │
   ▼
Brevo sends Verification OTP
   │
   ▼
Verify Email
   │
   ▼
Welcome Email
```

---

### Forgot Password

```
Forgot Password
      │
      ▼
Generate Secure Token
      │
      ▼
Brevo sends Reset Link
      │
      ▼
Reset Password
      │
      ▼
Password Reset Success Email
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

BREVO_API_KEY=your_brevo_api_key

SENDER_EMAIL=your_verified_sender_email

SENDER_NAME=Auth App
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/SrilakshmanK/Authentication_Project.git
```

```bash
cd Authentication_Project
```

---

## Install Dependencies

```bash
npm run build
```

---

## Configure Environment Variables

Create

```
.env
```

inside the project root and add your credentials.

---

## Run Development Server

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# 📦 Available Scripts

| Script          | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start backend using Nodemon             |
| `npm run build` | Install dependencies and build frontend |
| `npm start`     | Start production server                 |

---

# 🔒 Security Features

* Passwords hashed using **bcrypt**
* JWT Authentication
* HTTP-only Cookies
* Secure Cookie Configuration
* Email Verification
* Password Reset Tokens
* Token Expiration
* Protected Backend Routes
* Persistent Login Sessions

---

# 📱 Frontend Routes

| Route                    | Description        |
| ------------------------ | ------------------ |
| `/signup`                | Register           |
| `/login`                 | Login              |
| `/verify-email`          | Email Verification |
| `/forgot-password`       | Forgot Password    |
| `/reset-password/:token` | Reset Password     |
| `/`                      | Dashboard          |

---

# 📈 Project Highlights

* Full-stack MERN Authentication
* Production Deployment on Render
* MongoDB Atlas Integration
* Brevo Transactional Email Integration
* Zustand State Management
* Secure Authentication Flow
* Responsive Modern UI
* RESTful API Architecture

---

# 📚 What I Learned

While building this project I gained practical experience in:

* Building complete authentication workflows
* JWT-based authentication and authorization
* Secure password hashing
* HTTP-only cookie sessions
* Email verification systems
* Password reset flow
* Third-party API integration (Brevo)
* MongoDB Atlas deployment
* Environment variable management
* Full-stack deployment on Render
* Zustand state management
* Debugging real-world production issues

---

# 🚀 Future Improvements

* Google OAuth Login
* GitHub OAuth Login
* Two-Factor Authentication (2FA)
* Refresh Token Rotation
* User Profile Management
* Profile Picture Upload
* Account Lockout Protection
* Rate Limiting
* Audit Logs
* Role-Based Access Control (RBAC)

---

# 📄 License

This project is licensed under the **MIT License**.
