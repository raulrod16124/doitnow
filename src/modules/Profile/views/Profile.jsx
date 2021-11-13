import "react-circular-progressbar/dist/styles.css";

import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "../../global/Loading";
import { GetUserProfile } from "../state/actions";

export const Profile = () => {
  const profileState = useSelector((state) => {
    return state.ProfileReducer;
  });

  const dispatch = useDispatch();

  const [userData, setUserData] = useState(undefined);

  const avatarImg = useRef();

  const [loadingVisibility, setLoadingVisibility] = useState(true);

  useEffect(async () => {
    const userDataFromLocalStore = await JSON.parse(
      localStorage.getItem("user")
    );
    switch (profileState.status) {
      case "initial":
        dispatch(GetUserProfile(userDataFromLocalStore.id));
        break;
      case "success":
        setUserData(profileState.data);
        setLoadingVisibility(false);
        // TODO - implement default img value
        avatarImg.current.style.backgroundImage =
          userData && `url(${userData.avatar})`;
        break;
    }
  }, [profileState]);

  // tasks Controller
  const [allTasksForProfileData, setallTasksForProfileData] = useState([]);
  const [tasksDoneForProfileData, setTasksDoneForProfileData] = useState([]);

  // Circle bar value
  const [circleBarValue, setcircleBarValue] = useState(0);
  useEffect(() => {
    const profileTasksData = JSON.parse(localStorage.getItem("tasks"));
    if (profileTasksData) {
      setallTasksForProfileData(profileTasksData);
      setTasksDoneForProfileData(
        profileTasksData.filter((task) => task.status === "done")
      );
      const doneTasks = profileTasksData.filter(
        (task) => task.status === "done"
      );
      setcircleBarValue(doneTasks.length / profileTasksData.length);
    }
  }, []);

  const levelBar =
    allTasksForProfileData.length > 0
      ? (tasksDoneForProfileData.length / (2500 / 50)) * 100 + "%"
      : 0 + "%";

  return (
    <>
      {loadingVisibility ? (
        <Loading />
      ) : (
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
                    <div
                      className="user-green-fill"
                      style={{
                        width: levelBar,
                      }}
                    ></div>
                  </div>
                  <div className="user-progress-data">
                    <p className="actual-exp">
                      {tasksDoneForProfileData.length * 50} exp.
                    </p>
                    <p className="exp-goal">5000 exp.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-task-done">
              <div className="circle-bar-content">
                <CircularProgressbar
                  value={circleBarValue}
                  maxValue={1}
                  text={`${Math.round(circleBarValue * 100)}%`}
                  styles={buildStyles({
                    textSize: "1.8vmin",
                    pathTransitionDuration: 0.5,
                    pathColor: "#1dd620",
                  })}
                />
              </div>
              <div className="text-content">
                <h3 className="text">Completed tasks</h3>
                <span className="counter">
                  {tasksDoneForProfileData.length} /{" "}
                  {allTasksForProfileData.length}
                </span>
              </div>
            </div>
          </div>
          <div className="profile-bottom">
            <div className="month-activity"></div>
          </div>
        </div>
      )}
    </>
  );
};
