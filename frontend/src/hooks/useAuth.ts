import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getToken, removeToken, saveToken } from "../utils/helpers";

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  // Login function: Save token and set user state
  const login = (token: string, userData: any) => {
    saveToken(token);
    setUser(userData);
  };

  // Logout function: Remove token and clear user state
  const logout = () => {
    removeToken();
    setUser(null);
  };

  // Check if the user is authenticated
  const isAuthenticated = (): boolean => {
    return getToken() !== null;
  };

  return {
    user,
    login,
    logout,
    isAuthenticated,
  };
};
