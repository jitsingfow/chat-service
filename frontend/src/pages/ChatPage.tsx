// src/pages/ChatPage.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useWebSocket } from "../services/websocket";
import { getUsers, getMessages, sendMessage } from "../services/api";
import "./ChatPage.css"; // Assuming you have a CSS file for styling
import { formatTimestamp } from "../utils/helpers";

interface User {
  id: string;
  email: string;
}

interface Message {
  senderId: string;
  recipientId: string;
  message: string;
  createdAt: string;
}

const ChatPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { socket, sendMessage: sendWebSocketMessage } = useWebSocket();
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  // Fetch users for 1:1 chat
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch chat messages when a recipient is selected
  useEffect(() => {
    if (currentRecipient) {
      const fetchMessages = async () => {
        try {
          const fetchedMessages = await getMessages(
            user.id,
            currentRecipient.id
          );
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
    }
  }, [currentRecipient, user]);

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socket?.off("receiveMessage");
    };
  }, [socket]);

  // Handle sending a new message
  // Handle sending a new message
  const handleSendMessage = async () => {
    if (currentRecipient && newMessage.trim()) {
      try {
        const messagePayload = {
          senderId: user.id,
          recipientId: currentRecipient.id,
          message: newMessage.trim(),
        };

        // Send message via API
        await sendMessage(user.id, currentRecipient.id, newMessage);

        // Send message via WebSocket (convert object to string using JSON.stringify)
        sendWebSocketMessage(JSON.stringify(messagePayload));

        // Update the UI with the new message
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...messagePayload, createdAt: new Date().toISOString() },
        ]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="chat-page">
      <div className="sidebar">
        <h2>Users</h2>
        <ul>
          {users.map((u) => (
            <li
              key={u.id}
              className={currentRecipient?.id === u.id ? "active" : ""}
              onClick={() => setCurrentRecipient(u)}
            >
              {u.email}
            </li>
          ))}
        </ul>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="chat-area">
        <div className="chat-header">
          <h2>
            {currentRecipient
              ? currentRecipient.email
              : "Select a user to chat"}
          </h2>
        </div>

        <div className="message-list">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-item ${
                msg.senderId === user.id ? "sent" : "received"
              }`}
            >
              <p>{msg.message}</p>
              <span className="message-time">
                {formatTimestamp(msg.createdAt)}
              </span>
            </div>
          ))}
        </div>

        {currentRecipient && (
          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
