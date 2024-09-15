// src/App.tsx
import React from "react";
import "./App.css"; // Import any global CSS
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="app-container">
        <AppRouter />
      </div>
    </AuthProvider>
  );
};

export default App;
