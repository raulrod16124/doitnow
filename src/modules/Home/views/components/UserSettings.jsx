import { signOut } from "firebase/auth";
import React from "react";

import auth from "../../../../firebase/config";
import { Button } from "../../../../stories/Button";
import { CloseIcon } from "../../../global/Icons";

function UserSettings({ handleCloseModalWindow }) {
  const handleLogoutUser = () => {
    localStorage.clear();
    signOut(auth);
  };

  return (
    <div className="modal-window">
      <div className="modal-window-header">
        <h2 className="title">Settings</h2>
        <CloseIcon size="3" className="icon" onClick={handleCloseModalWindow} />
      </div>
      <div className="settings">
        <li className="option">Theme</li>
        <li className="option">Profile</li>
        <li className="option">Settings</li>
      </div>
      <Button size="mediun" label="logout" onClick={handleLogoutUser} />
    </div>
  );
}

export default UserSettings;
