import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import auth from "../../../../firebase/config";

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

  return (
    <div className="header">
      <div className="logo-app">DOITNOW</div>
      <div className="nav-bar">
        <div className="navegation-content">
          <a href="/home" className={homeSelected}>
            Home
          </a>
          <a href="/stats" className={statsSelected}>
            Stats
          </a>
        </div>
      </div>
      <div className="user-settings">
        <p className="user-name">
          {userData && userData.email ? userData.email.split("@")[0] : ""}
        </p>
        <div className="user-avatar">🐱‍👤</div>
      </div>
    </div>
  );
};
