import React from "react";

interface MessageProps {
  text: string;
  sender: "sent" | "received";
}

const Message: React.FC<MessageProps> = ({ text, sender }) => {
  return (
    <div style={{ textAlign: sender === "sent" ? "right" : "left" }}>
      <div
        style={{
          display: "inline-block",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: sender === "sent" ? "#dcf8c6" : "#ffffff",
          border: "1px solid #ccc",
          marginBottom: "5px",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
