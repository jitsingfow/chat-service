// src/services/helper.ts

// Helper function to save token to localStorage
export const saveToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

// Helper function to get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// Helper function to remove token from localStorage (logout)
export const removeToken = () => {
  localStorage.removeItem("authToken");
};

// Helper function to check if the user is authenticated (i.e., token exists)
export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

// Helper function to format timestamps (e.g., for displaying chat timestamps)
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Helper function to safely parse JSON (in case the data might not be valid JSON)
export const safeJsonParse = (jsonString: string): any => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("JSON parsing error:", error);
    return null;
  }
};

// Helper function to debounce a function (e.g., for search input fields)
export const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
