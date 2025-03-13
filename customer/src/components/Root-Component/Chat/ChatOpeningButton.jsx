import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";

import "./ChatOpeningButton.css";

const ChatOpeningButton = () => {
  const isAuthenticated = localStorage.getItem("user");

  return isAuthenticated ? (
    <button className="chat_redirect">
      <Link to={"/chat"}>
        <IoLogoWhatsapp className="open_chat_icon" />
      </Link>
    </button>
  ) : null;
};

export default ChatOpeningButton;
