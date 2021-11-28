import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import avatar from "./../../assets/avatars/girl1.png";
import auth from "../../firebase/config";
import { ViewSelected } from "../Aside/state/action";

export const Header = () => {
  const [userData, setUserData] = useState();

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      setUserData(JSON.parse(localStorage.getItem("user")));
    }
  }, [auth.currentUser]);

  return (
    <div className="avatar-header">
      {location.pathname !== "/profile" && (
        <div className="avatar-content">
          <p className="user-name">
            {userData && userData.name ? userData.name : ""}
          </p>
          <Link to="/profile" onClick={() => dispatch(ViewSelected("account"))}>
            <img className="avatar" src={avatar} alt="avatar" />
          </Link>
        </div>
      )}
    </div>
  );
};
