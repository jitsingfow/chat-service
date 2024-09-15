// src/services/api.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Your NestJS backend URL

// Set up the Axios instance with default settings
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle user registration
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Handle user login
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Get all users for 1:1 chat
export const getUsers = async () => {
  try {
    const response = await apiClient.get("/user/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch chat messages between two users
export const getMessages = async (userId: string, recipientId: string) => {
  try {
    const response = await apiClient.get(`/messages/${userId}/${recipientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

// Send a new message between two users
export const sendMessage = async (
  senderId: string,
  recipientId: string,
  message: string
) => {
  try {
    const response = await apiClient.post("/messages", {
      senderId,
      recipientId,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
