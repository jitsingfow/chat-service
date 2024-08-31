// src/Chat.tsx

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Define the type for the message
interface IMessage {
  id: number;
  text: string;
}

// Connect to the WebSocket server
const socket = io("http://localhost:3000"); // Adjust the URL as needed

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  useEffect(() => {
    // Handle incoming messages
    socket.on("message", (message: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: nextId, text: message },
      ]);
      setNextId(nextId + 1);
    });

    // Clean up on component unmount
    return () => {
      socket.off("message");
    };
  }, [nextId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <div
        id="messages"
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{
          width: "calc(100% - 80px)",
          padding: "10px",
          marginRight: "10px",
        }}
      />
      <button onClick={sendMessage} style={{ padding: "10px" }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
