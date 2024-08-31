import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegistration from "./components/UserRegistration";
import EnterGuestID from "./components/EnterGuestID";
import ChatScreen from "./components/ChatScreen";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRegistration />} />
        <Route path="/enter-guest-id" element={<EnterGuestID />} />
        <Route path="/chat/:guestID" element={<ChatScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
