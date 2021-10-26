import { signOut } from "@firebase/auth";
import React from "react";

import auth from "../../firebase/config";

export const Footer = () => {
  const handleLogoutUser = () => {
    localStorage.clear();
    signOut(auth);
  };
  return (
    <footer className="footer" onClick={handleLogoutUser}>
      <p className="footer-text">Desconect</p>
    </footer>
  );
};
