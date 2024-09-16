import React, { useState } from "react";
import "./ChatPage.css"; // For styling the page

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  plan: string;
  joined: string;
  avatar?: string;
  active: boolean;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Christino",
      text: "When are you coming?",
      time: "05:40pm",
    },
    {
      id: 2,
      sender: "Me",
      text: "Hi Dear, I’ll be there by 7:30pm, btw where are u?",
      time: "06:30pm",
    },
    { id: 3, sender: "Christino", text: "Coming..", time: "06:50pm" },
    {
      id: 4,
      sender: "Me",
      text: "Hi Dear, I’ll be there by 7:30pm, btw where are u?",
      time: "06:30pm",
    },
    {
      id: 5,
      sender: "Me",
      text: "Hi Dear, I’ll be there by 7:30pm, btw where are u?",
      time: "06:30pm",
    },
    { id: 5, sender: "Christino", text: "Coming..", time: "06:50pm" },
    { id: 7, sender: "Christino", text: "Coming..", time: "06:50pm" },
    { id: 8, sender: "Christino", text: "Coming..", time: "06:50pm" },
  ]);

  const [chatInput, setChatInput] = useState<string>("");

  const user: User = {
    id: 1,
    name: "Christino Morillo",
    email: "akp.emma1231@gmail.com",
    phone: "+91-8897584843",
    address: "Po Box 2103 Linden, NJ 07036 (USA)",
    plan: "$100",
    joined: "Mon 22nd Feb 2019",
    active: true,
  };

  const getInitials = (name: string) => {
    const nameSplit = name.split(" ");
    const initials = nameSplit.map((n) => n.charAt(0)).join("");
    return initials.toUpperCase();
  };

  const handleSendMessage = () => {
    if (chatInput.trim() !== "") {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "Me",
        text: chatInput,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setChatInput("");
    }
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <h2>Chat App</h2>
        </div>
        <div className="header-right">
          <div>
            <a href="#logout" className="logout-link">
              Logout
            </a>
          </div>
          <div className="profile-icon-container">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="profile-icon" />
            ) : (
              <div className="initials-avatar small">
                {getInitials(user.name)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar: Chat List */}
      <div className="sidebar">
        <div className="sidebar-header">
          <input type="text" placeholder="Search" className="search-bar" />
        </div>
        <div className="chat-list">
          <div className="chat-item active">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="avatar" />
            ) : (
              <div className="initials-avatar">{getInitials(user.name)}</div>
            )}
            <div className="chat-info">
              <h4>{user.name}</h4>
              <p>When are you coming?</p>
            </div>
            <span className="chat-time">05:40pm</span>
          </div>
          <div className="chat-item active">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="avatar" />
            ) : (
              <div className="initials-avatar">JS</div>
            )}
            <div className="chat-info">
              <h4>Jit</h4>
              <p>Whats up</p>
            </div>
            <span className="chat-time">05:20pm</span>
          </div>
          {/* Additional chat items */}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-area">
        <div className="chat-header">
          <h4>{user.name}</h4>
          <p>Active Now</p>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${
                msg.sender === "Me" ? "sent" : "received"
              }`}
            >
              <p>{msg.text}</p>
              <span className="chat-time">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type here..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
