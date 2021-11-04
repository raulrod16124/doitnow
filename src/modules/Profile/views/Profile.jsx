import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetUserProfile } from "../state/actions";

export const Profile = () => {
  const profileState = useSelector((state) => {
    console.log(state.ProfileReducer);
    return state.ProfileReducer;
  });

  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: "noname",
    email: "noemail@noemail.com",
    avatar: "noavatar",
  });

  useEffect(() => {
    const userDataCache = JSON.parse(localStorage.getItem("user"));
    if (profileState.status === "created profile success") {
      console.log(profileState.data);
      setUserData(profileState.data);
      dispatch(GetUserProfile(userDataCache.uid));
    }
    if (userDataCache.uid && profileState.status === "success") {
      console.log(profileState.data);
      setUserData(userDataCache);
    }
    console.log(userDataCache);
  }, [profileState]);

  console.log(userData);

  return (
    <div className="profile">
      <div className="profile-top">
        <div className="user-data">
          <img
            className="user-avatar"
            src={
              userData && userData.avatar
                ? userData.avatar
                : "./../../../assets/avatars/girl1.png"
            }
            alt="avatar"
          />
          <h3>{userData.name}</h3>
        </div>
        <div className="user-task-done"></div>
      </div>
    </div>
  );
};
