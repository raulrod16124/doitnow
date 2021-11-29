import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { ViewSelected } from "../Aside/state/action";
import { GetUserProfile } from "../Profile/state/actions";
import { defaultAvatar } from "../Profile/views/components/avatars";

export const Header = () => {
  const profileState = useSelector((state) => {
    return state.ProfileReducer;
  });

  const [userData, setUserData] = useState();

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(async () => {
    const userDataFromLocalStore = await JSON.parse(
      localStorage.getItem("user")
    );
    // console.log(profileState.status);
    switch (profileState.status) {
      case "initial":
        // console.log("GETTING ");
        dispatch(GetUserProfile(userDataFromLocalStore.id));
        break;
      case "userData_updated":
        dispatch(GetUserProfile(userDataFromLocalStore.id));
        break;
      case "success":
        setUserData(profileState.data);
        break;
    }
  }, [profileState]);

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
