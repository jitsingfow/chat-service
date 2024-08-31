import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegistration: React.FC = () => {
  const [userID, setUserID] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userID && userName) {
      localStorage.setItem("userID", userID);
      localStorage.setItem("userName", userName);
      navigate("/enter-guest-id");
    }
  };

  return (
    <div>
      <h1>Enter Your ID and Name</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          placeholder="Enter Your ID"
        />
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter Your Name"
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default UserRegistration;
