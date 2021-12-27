import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  useEffect(async () => {
    const userDataFromLocalStore = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
    );
    // console.log(profileState.status);
    switch (profileState.status) {
      case "initial":
        console.log("GETTING ");
        if (userDataFromLocalStore) {
          dispatch(GetUserProfile(userDataFromLocalStore.id));
        }
        break;
      case "userData_updated":
        dispatch(GetUserProfile(userDataFromLocalStore.id));
        break;
      case "success":
        console.log("getProfiledata in header success");
        setUserData(profileState.data);
        break;
    }
  }, [profileState]);

  return (
    <div className="avatar-header">
      <div className="avatar-content">
        <p className="user-name">
          Hi {userData && userData.name ? userData.name : ""}
        </p>
        <Link to="/profile" onClick={() => dispatch(ViewSelected("account"))}>
          <img
            className="avatar"
            src={userData && userData.avatar ? userData.avatar : defaultAvatar}
            alt="avatar"
          />
        </Link>
        <p className="user-name-responsive">
          Hi {userData && userData.name ? userData.name : ""}
        </p>
      </div>
    </div>
  );
};
