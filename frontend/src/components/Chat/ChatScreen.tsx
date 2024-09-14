import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

// Define the type for a message
interface Message {
  sender: string;
  text: string;
}

// Initialize socket connection
const socket = io("http://localhost:3000"); // Replace with your server URL

const ChatScreen: React.FC = () => {
  const { guestID } = useParams(); // Get route parameters
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  // Retrieve user ID and name from local storage
  const userName = localStorage.getItem("userName") || "User"; // Only using userName

  useEffect(() => {
    if (guestID) {
      // Emit event to join the chat room
      socket.emit("joinRoom", guestID);

      // Handle incoming messages
      socket.on("message", (msg: Message) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      // Clean up on component unmount
      return () => {
        socket.emit("leaveRoom", guestID);
        socket.disconnect();
      };
    }
  }, [guestID]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Emit message to the server
      socket.emit("chatMessage", { guestID, sender: userName, text: message });
      setMessage("");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar for chat history */}
      <div style={{ flex: 1, borderRight: "1px solid #ccc", padding: "10px" }}>
        <h2>Chat History</h2>
        <ul>
          {/* Assuming you have a list of chat IDs */}
          {/* Replace with actual chat IDs */}
          <li>
            <a href={`/chat/some-other-id`}>Chat with some-other-id</a>
          </li>
        </ul>
      </div>

      {/* Main chat area */}
      <div style={{ flex: 3, padding: "10px" }}>
        <h2>Chat with {guestID}</h2>
        <div
          style={{
            height: "300px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          {/* Display messages */}
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{ textAlign: msg.sender === userName ? "right" : "left" }}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;
