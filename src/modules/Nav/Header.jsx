import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import avatar from "./../../assets/avatars/girl1.png";
import auth from "../../firebase/config";

export const Header = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      setUserData(JSON.parse(localStorage.getItem("user")));
    }
  }, [auth.currentUser]);

  return (
    <div className="avatar-header">
      <div className="avatar-content">
        <p className="user-name">
          {userData && userData.name ? userData.name : ""}
        </p>
        <Link to="/profile">
          <img className="avatar" src={avatar} alt="avatar" />
        </Link>
      </div>
    </div>
  );
};
