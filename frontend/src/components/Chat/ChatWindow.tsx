import React, { useEffect, useState } from "react";
import { Message } from "./Message";
import { MessageInput } from "./MessageInput";
import { useWebSocket } from "../../services/websocket";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const { socket, sendMessage } = useWebSocket();

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message: string) => {
        setMessages([...messages, message]);
      });
    }
  }, [messages, socket]);

  const handleSend = (msg: string) => {
    sendMessage(msg);
    setMessages([...messages, msg]);
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <Message key={index} text={msg} />
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
