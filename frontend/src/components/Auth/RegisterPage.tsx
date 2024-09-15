// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import "./RegisterPage.css"; // Assuming you have a CSS file for styling

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call the API to register the user
      await registerUser(email, password);

      // On successful registration, login the user
      await login(email, password);

      // Redirect to the chat page after login
      navigate("/chat");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Error registering user:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="redirect-link">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default RegisterPage;
