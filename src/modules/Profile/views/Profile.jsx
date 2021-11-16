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
        profileTasksData.filter(
          (task) => task.status === "done" || task.status === "archive"
        )
      );
      const doneTasks = profileTasksData.filter(
        (task) => task.status === "done" || task.status === "archive"
      );
      setcircleBarValue(doneTasks.length / profileTasksData.length);
    }
  }, []);

  const levelBar =
    allTasksForProfileData.length > 0
      ? (tasksDoneForProfileData.length / (5000 / 50)) * 100 + "%"
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
                    strokeLinecap: "butt",
                    pathColor: "#1dd620",
                  })}
                />
              </div>
              <div className="text-content">
                <h3 className="text">Completed tasks</h3>
                <span className="counter">
                  <span className="counter-done">
                    {tasksDoneForProfileData.length}{" "}
                  </span>
                  / {allTasksForProfileData.length}
                </span>
              </div>
            </div>
            <div className="content-extra-profile-data">
              <div className="daily-record">
                <i className="fas fa-fire icon daily"></i>
                <div className="content-data">
                  <span className="data">
                    5 <p className="data-text">tasks</p>
                  </span>
                  <p className="text">Daily Record</p>
                </div>
              </div>
              <div className="best-week-record">
                <i className="fas fa-medal icon week"></i>
                <div className="content-data">
                  <span className="data">
                    12 <p className="data-text">tasks</p>
                  </span>
                  <p className="text">Week Record</p>
                </div>
              </div>
              <div className="best-streak">
                <i className="fas fa-trophy icon streak"></i>
                <div className="content-data">
                  <span className="data">
                    6 <p className="data-text">days</p>
                  </span>
                  <p className="text">Best Streak</p>
                </div>
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
