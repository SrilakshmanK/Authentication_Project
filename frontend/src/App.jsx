import FloatingShape from "./components/FloatingShape.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import TestPage from "./pages/TestPage.jsx";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore.js";
import { Children, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

// protect routes that require authentication 
const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to="/login" replace />;
  }

  if(!user.isVerified){
    return <Navigate to="verify-email" replace />
  }
  return children;
}

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-slate-900 to-indigo-950 flex items-center justify-center relative overflow-hidden">
      <FloatingShape
        color="bg-indigo-500"
        size="w-64 h-64"
        top="-5%"
        left="-10%"
        delay={0}
      />
      <FloatingShape
        color="bg-violet-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-fuchsia-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <Routes>
        <Route path="/" element={
         <ProtectedRoute>
          <DashboardPage/>
         </ProtectedRoute> 
        } />

        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
          <ForgotPasswordPage />
        </RedirectAuthenticatedUser>} />


        <Route path="/testing" element={<TestPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
