// src/services/websocket.ts
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Your NestJS WebSocket endpoint

export const useWebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Establish the WebSocket connection
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
    });

    // Set up event listeners if needed
    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Clean up on component unmount
    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit("sendMessage", message);
    }
  };

  return {
    socket,
    sendMessage,
  };
};
