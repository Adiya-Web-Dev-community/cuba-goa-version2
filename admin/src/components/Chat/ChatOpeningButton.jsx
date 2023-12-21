import React from "react";
import { IoIosChatbubbles } from "react-icons/io";
import { Link } from "react-router-dom";

import "./ChatOpeningButton.css";

const ChatOpeningButton = () => {
  const isAuthenticated = localStorage.getItem("user");

  return isAuthenticated ? (
    <button className="chat_redirect">
      <Link to={"/chat"}>
        <IoIosChatbubbles className="open_chat_icon" />
      </Link>
    </button>
  ) : null;
};

export default ChatOpeningButton;
