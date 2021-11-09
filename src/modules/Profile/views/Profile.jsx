import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetUserProfile } from "../state/actions";

export const Profile = () => {
  const profileState = useSelector((state) => {
    console.log(state.ProfileReducer);
    return state.ProfileReducer;
  });

  const dispatch = useDispatch();

  const [userData, setUserData] = useState(undefined);

  const avatarImg = useRef();

  useEffect(async () => {
    console.log(profileState);
    const userDataFromLocalStore = await JSON.parse(
      localStorage.getItem("user")
    );
    switch (profileState.status) {
      case "initial":
        dispatch(GetUserProfile(userDataFromLocalStore.id));
        break;
      case "success":
        setUserData(profileState.data);
        avatarImg.current.style.backgroundImage =
          userData && `url(${userData.avatar})`;
        break;
    }
  }, [profileState]);

  return (
    <div className="profile">
      <div className="profile-top">
        <div className="user-data-content">
          <div className="user-data">
            <div className="user-level">Beginner</div>
            <div className="user-avatar" ref={avatarImg}></div>
            <p className="user-name">{userData && userData.name}</p>
            <p className="user-email">{userData && userData.email}</p>
            <div className="user-progress-level-bar">
              <div className="user-level-bar">
                <div className="user-green-fill"></div>
              </div>
              <div className="user-progress-data">
                <p className="actual-exp">250 exp.</p>
                <p className="exp-goal">2500 exp.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="user-task-done"></div>
      </div>
      <div className="profile-bottom">
        <div className="month-activity"></div>
      </div>
    </div>
  );
};
