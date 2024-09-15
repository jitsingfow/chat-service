// src/AppRouter.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "../components/Auth/LoginPage";
import ChatPage from "../pages/ChatPage";
import RegisterPage from "../components/Auth/RegisterPage";

const AppRouter: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Redirect to login if user is not authenticated */}
        <Route
          path="/"
          element={user ? <Navigate to="/chat" /> : <Navigate to="/login" />}
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/chat" />}
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to="/chat" />}
        />

        {/* Private Route: Only accessible when user is authenticated */}
        <Route
          path="/chat"
          element={user ? <ChatPage /> : <Navigate to="/login" />}
        />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
