import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import auth from "../../firebase/config";
import { ViewSelected } from "../Aside/state/action";
import { defaultAvatar } from "../Profile/views/components/avatars";

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
            <img
              className="avatar"
              src={
                userData && userData.avatar ? userData.avatar : defaultAvatar
              }
              alt="avatar"
            />
          </Link>
        </div>
      )}
    </div>
  );
};
