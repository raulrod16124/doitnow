import { signOut } from "@firebase/auth";
import React from "react";
import { useHistory } from "react-router";

import auth from "../../firebase/config";

export const Footer = () => {
  const history = useHistory();
  const handleLogoutUser = () => {
    localStorage.clear();
    signOut(auth);
    history.push({ pathname: "/login" });
  };
  return (
    <footer className="footer" onClick={handleLogoutUser}>
      <p className="footer-text">
        <i className="fas fa-sign-out-alt"></i> Desconect
      </p>
    </footer>
  );
};
