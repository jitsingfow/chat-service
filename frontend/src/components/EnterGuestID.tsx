import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterGuestID: React.FC = () => {
  const [guestID, setGuestID] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (guestID) {
      navigate(`/chat/${guestID}`);
    }
  };

  return (
    <div>
      <h1>Enter Guest ID</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guestID}
          onChange={(e) => setGuestID(e.target.value)}
          placeholder="Enter Guest ID"
        />
        <button type="submit">Start Chat</button>
      </form>
    </div>
  );
};

export default EnterGuestID;
