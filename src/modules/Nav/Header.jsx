import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import avatar from "./../../assets/avatars/girl1.png";
import auth from "../../firebase/config";

export const Header = ({ todos }) => {
  const history = useHistory();

  const [userData, setUserData] = useState();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      setUserData(JSON.parse(localStorage.getItem("user")));
    }
  }, [auth.currentUser]);

  let className = require("classnames");
  let homeSelected = className("section", {
    selected: history.location.pathname === "/home",
  });
  let statsSelected = className("section", {
    selected: history.location.pathname === "/stats",
  });
  let profileSelected = className("user-settings", {
    selected: history.location.pathname === "/profile",
  });

  return (
    <div className="header">
      <div className="logo-app">
        <h1>DOITNOW</h1>
      </div>
      <div className="nav-bar">
        <div className="navegation-content">
          <Link to="/home" className={homeSelected}>
            <i class="fas fa-home"></i>
          </Link>
          <Link to="/stats" className={statsSelected}>
            <i class="fas fa-chart-bar"></i>
          </Link>
        </div>
      </div>
      <div className={profileSelected}>
        <p className="user-name">
          {userData && userData.name ? userData.name : ""}
        </p>
        <Link to="/profile" className="user-avatar">
          <img className="avatar" src={avatar} alt="avatar" />
        </Link>
      </div>
    </div>
  );
};
