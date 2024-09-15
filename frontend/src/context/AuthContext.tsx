// src/context/authContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { getUsers } from "../services/api"; // Example API call to fetch user data
import { getToken, removeToken } from "../utils/helpers";

// Define the AuthContext type
interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

// AuthContext provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      // Example API call to fetch user data based on token
      getUsers()
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          removeToken();
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
