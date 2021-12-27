import "react-circular-progressbar/dist/styles.css";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../../stories/Button";
import {
  NextLevelXP,
  XPLevels,
  handleCalcutlateXP,
} from "../../ExperiencePoints/XPLevels";
import { Loading } from "../../global/Loading";
import { GetTasks } from "../../Home/state/actions";
import { months } from "../../Home/views/components/dateData";
import { updateProfile } from "../provider";
import { GetUserProfile, UpdateUserProfile } from "../state/actions";
import { defaultAvatar } from "./components/avatars";
import { AvatarSelector } from "./components/AvatarSelector";
import { DailyRecord, WeekRecord, weeklyAverage } from "./components/DataLogic";
import { ExtraProfileData } from "./components/ExtraProfileData";

export const Profile = () => {
  const profileState = useSelector((state) => {
    return state.ProfileReducer;
  });

  const todosState = useSelector((state) => {
    return state.TodosReducer;
  });

  const dispatch = useDispatch();

  const [userData, setUserData] = useState(undefined);

  const [avatarSelectorView, setAvatarSelectorView] = useState(false);
  const [nameEditView, setNameEditView] = useState(false);
  const [nameEdited, setNameEdited] = useState("");
  const [emailEditView, setEmailEditView] = useState(false);
  const [emailEdited, setEmailEdited] = useState("");

  const daysInCurrentMonth = (prev) => {
    let formatDate = {
      day: new Date().getDay(),
      month: prev ? new Date().getMonth() : new Date().getMonth() - 1,
      year: new Date().getFullYear(),
    };
    return (formatDate = `${formatDate.year}/${formatDate.month}/${formatDate.day}`);
  };
  const currentMonth = new Date().getMonth();
  const [loadingVisibility, setLoadingVisibility] = useState(true);

  const [monthlyActivity, setMonthlyActivity] = useState(
    Array.from(Array(dayjs(daysInCurrentMonth()).daysInMonth()).keys())
  );
  const [prevMonthlyActivity, setPrevMonthlyActivity] = useState(
    Array.from(Array(dayjs(daysInCurrentMonth("prev")).daysInMonth()).keys())
  );

  useEffect(async () => {
    const userDataFromLocalStore = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
    );
    // console.log(profileState.status);
    switch (profileState.status) {
      case "initial":
        // console.log("GETTING PROFILE");
        dispatch(GetUserProfile(userDataFromLocalStore.id));
        break;
      case "userData_updated":
        dispatch(GetUserProfile(userDataFromLocalStore.id));
        break;
      case "success":
        setUserData(profileState.data);
        setNameEdited(profileState.data.name);
        setEmailEdited(profileState.data.email);
        setLoadingVisibility(false);
        break;
    }

    // console.log(userDataFromLocalStore);
  }, [profileState]);

  // tasks Controller
  const [allTasksForProfileData, setallTasksForProfileData] = useState([]);
  const [tasksDoneForProfileData, setTasksDoneForProfileData] = useState([]);

  const [previousMonthlyActivity, setPreviousMonthlyActivity] = useState([]);
  const [currentMonthlyActivity, setCurrentMonthlyActivity] = useState([]);

  const [expRequireToActualLevel, setExpRequireToActualLevel] = useState([]);
  const [expRequireToNextLevel, setExpRequireToNextLevel] = useState([]);

  const [dataTasksForStats, setDataTasksForStats] = useState({
    daily_record: 0,
    week_record: 0,
    weekly_average: 0,
  });

  // Circle bar value
  const [circleBarValue, setcircleBarValue] = useState(0);
  useEffect(async () => {
    const userDataLocalStorage = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
    );
    if (
      todosState.status === "initial" ||
      todosState.status === "task_created" ||
      todosState.status === "task_deleted" ||
      todosState.status === "task_updated"
    ) {
      dispatch(GetTasks(userDataLocalStorage));
    }
    if (todosState.status === "success") {
      setallTasksForProfileData(todosState.data);
      setTasksDoneForProfileData(
        todosState.data.filter(
          (task) => task.status === "done" || task.status === "archive"
        )
      );
      const doneTasks = todosState.data.filter(
        (task) => task.status === "done" || task.status === "archive"
      );
      setcircleBarValue(
        doneTasks.filter((task) => task.date.split("/")[1] == currentMonth + 1)
          .length /
          todosState.data.filter(
            (task) => task.date.split("/")[1] == currentMonth + 1
          ).length
      );
      handleGetStatsData(todosState.data);
      handleGetCurrentMonthlyActivity(todosState.data);
      handleGetCurrentMonthlyActivity(todosState.data, "prev");
      const { level } = XPLevels(handleCalcutlateXP(todosState.data));
      setExpRequireToNextLevel(NextLevelXP(level));
      setExpRequireToActualLevel(NextLevelXP(level - 1));
    }
  }, [todosState]);

  // TODO - Resolve the bar level
  const levelBar = () => {
    if (allTasksForProfileData.length > 0) {
      const diff = expRequireToNextLevel - expRequireToActualLevel;
      const actualProgress = userData.experience - expRequireToActualLevel;
      const barPercentage = Math.round((actualProgress * 100) / diff);
      return `${barPercentage}%`;
    }
  };

  const handleGetStatsData = (list) => {
    setDataTasksForStats({
      ...dataTasksForStats,
      daily_record: DailyRecord(list),
      week_record: WeekRecord(list),
      weekly_average: weeklyAverage(list),
    });
  };

  // TODO Monthly activity

  const handleGetCurrentMonthlyActivity = (list, prev) => {
    if (prev) {
      const previousMonthDays = prevMonthlyActivity.map((day) => {
        return {
          day: `${day + 1}/${currentMonth}/${new Date().getFullYear()}`,
          tasks: handleGetTaskPerDay(
            `${day + 1}/${currentMonth}/${new Date().getFullYear()}`,
            list
          ),
        };
      });
      setPreviousMonthlyActivity(previousMonthDays);
    } else {
      const currentMonthDays = monthlyActivity.map((day) => {
        return {
          day: `${day + 1}/${currentMonth + 1}/${new Date().getFullYear()}`,
          tasks: handleGetTaskPerDay(
            `${day + 1}/${currentMonth + 1}/${new Date().getFullYear()}`,
            list
          ),
        };
      });
      setCurrentMonthlyActivity(currentMonthDays);
    }
  };
  const handleGetTaskPerDay = (date, list) => {
    let count = 0;
    list.map((task) => {
      if (
        date === task.date &&
        (task.status === "done" || task.status === "archive")
      ) {
        count++;
      }
    });
    return count;
  };

  const handleSetAvatarSelectorView = (boolean) => {
    setAvatarSelectorView(boolean);
  };

  const handleUpdateUserData = (avatarSelected) => {
    // console.log(avatarSelected);
    setUserData({ ...userData, avatar: avatarSelected });
    dispatch(
      UpdateUserProfile(userData.id, { ...userData, avatar: avatarSelected })
    );
  };

  const handleUpdateExperienceOfUser = () => {
    dispatch(async () => {
      const totalXP = await handleCalcutlateXP(allTasksForProfileData);
      updateProfile(userData.id, {
        ...userData,
        experience: totalXP,
      });
    });
  };

  return (
    <>
      {loadingVisibility ? (
        <Loading />
      ) : (
        <>
          {handleUpdateExperienceOfUser()}
          <div className="profile">
            {avatarSelectorView && (
              <AvatarSelector
                userData={userData}
                handleSetAvatarSelectorView={handleSetAvatarSelectorView}
                handleUpdateUserData={handleUpdateUserData}
              />
            )}
            <div className="profile-top">
              <div className="user-data-content">
                <div className="user-data">
                  <div className="level-content">
                    <label className="label">Level</label>
                    <div className="user-level">
                      {userData && userData.level}
                    </div>
                  </div>
                  <img
                    className="user-avatar"
                    src={userData ? userData.avatar : defaultAvatar}
                  />
                  <div className="avatarEditButton">
                    <i
                      className="fas fa-edit icon"
                      onClick={() => handleSetAvatarSelectorView(true)}
                    ></i>
                  </div>
                  <div className="name-content">
                    {!nameEditView ? (
                      <>
                        <p className="user-name">{userData && userData.name}</p>
                        <i
                          className="fas fa-edit icon"
                          onClick={() => setNameEditView(true)}
                        ></i>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          className="user-name-edit"
                          value={nameEdited}
                          onChange={(e) => setNameEdited(e.target.value)}
                        />
                        <div className="content-buttons">
                          <Button
                            label="Cancel"
                            onClick={() => setNameEditView(false)}
                            size="small"
                          />
                          <Button
                            label="Save"
                            primary
                            onClick={() => {
                              dispatch(
                                UpdateUserProfile(userData.id, {
                                  ...userData,
                                  name: nameEdited,
                                })
                              );
                              setNameEditView(false);
                            }}
                            size="small"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="email-content">
                    {!emailEditView ? (
                      <>
                        <p className="user-email">
                          {userData && userData.email}
                        </p>
                        {/* <i
                          className="fas fa-edit icon"
                          onClick={() => setEmailEditView(true)}
                        ></i> */}
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          className="user-email-edit"
                          value={emailEdited}
                          onChange={(e) => setEmailEdited(e.target.value)}
                        />
                        <div className="content-buttons">
                          <Button
                            label="Cancel"
                            onClick={() => setEmailEditView(false)}
                            size="small"
                          />
                          <Button
                            label="Save"
                            primary
                            onClick={() => {
                              dispatch(
                                UpdateUserProfile(userData.id, {
                                  ...userData,
                                  email: emailEdited,
                                })
                              );
                              setEmailEditView(false);
                            }}
                            size="small"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="user-progress-level-bar">
                    <div className="user-level-bar">
                      <div
                        className="user-green-fill"
                        style={{
                          width: levelBar(),
                        }}
                      ></div>
                      <p className="actual-exp-points">
                        {handleCalcutlateXP(allTasksForProfileData)} exp.
                        {/* {userData.experience} exp. */}
                      </p>
                    </div>
                    <div className="user-progress-data">
                      <p className="actual-exp-text">
                        {expRequireToActualLevel} exp.
                      </p>
                      <p className="exp-goal">{expRequireToNextLevel} exp.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="user-task-done">
                <div className="content-circle-data">
                  <div className="circle-bar-content">
                    <CircularProgressbar
                      value={circleBarValue > 0 && circleBarValue}
                      maxValue={1}
                      text={`${Math.round(
                        circleBarValue > 0 ? circleBarValue * 100 : 0
                      )}%`}
                      styles={buildStyles({
                        textSize: "1.6rem",
                        pathTransitionDuration: 0.5,
                        strokeLinecap: "butt",
                        pathColor: "#1dd620",
                      })}
                    />
                  </div>
                  <div className="text-content">
                    <h3 className="text">Current month</h3>
                    <span className="counter">
                      <span className="counter-done">
                        {
                          tasksDoneForProfileData.filter(
                            (task) =>
                              task.date.split("/")[1] == currentMonth + 1
                          ).length
                        }{" "}
                      </span>
                      /{" "}
                      {
                        allTasksForProfileData.filter(
                          (task) => task.date.split("/")[1] == currentMonth + 1
                        ).length
                      }
                    </span>
                  </div>
                </div>
                <div className="content-extra-profile-data-responsive">
                  <ExtraProfileData dataTasksForStats={dataTasksForStats} />
                </div>
              </div>
              <div className="content-extra-profile-data-web">
                <ExtraProfileData dataTasksForStats={dataTasksForStats} />
              </div>
            </div>
            <div className="profile-bottom">
              <div className="month-overview previous-month">
                <h3 className="month-title">
                  <span className="month-name">
                    {Object.values(months)[currentMonth - 1].month}
                  </span>{" "}
                  - completed{" "}
                  {
                    allTasksForProfileData.filter(
                      (task) =>
                        task.date.split("/")[1] == currentMonth &&
                        (task.status === "done" || task.status === "archive")
                    ).length
                  }
                </h3>
                <div className="monthly-activity">
                  {previousMonthlyActivity.length > 0 &&
                    previousMonthlyActivity.map((day) => {
                      const borderColor = day.tasks > 0 ? "#1dd620" : "#ddd";
                      return (
                        <div
                          key={day.day}
                          className="day-of-current-month"
                          style={{
                            border: `.1vmin solid ${borderColor}`,
                          }}
                        >
                          <div className="task-quantity">
                            {day.tasks > 0 && day.tasks}
                          </div>
                          <div
                            className="fill-green"
                            style={{
                              height:
                                (day.tasks / dataTasksForStats.daily_record) *
                                  100 +
                                "%",
                            }}
                          ></div>
                          <p className="day-text">{day.day.split("/")[0]}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="month-overview current-month">
                <h3 className="month-title">
                  <span className="month-name">
                    {Object.values(months)[currentMonth].month}
                  </span>{" "}
                  - completed{" "}
                  {
                    allTasksForProfileData.filter(
                      (task) =>
                        task.date.split("/")[1] == currentMonth + 1 &&
                        (task.status === "done" || task.status === "archive")
                    ).length
                  }
                </h3>
                <div className="monthly-activity">
                  {currentMonthlyActivity.length > 0 &&
                    currentMonthlyActivity.map((day) => {
                      const borderColor = day.tasks > 0 ? "#1dd620" : "#ddd";
                      return (
                        <div
                          key={day.day}
                          className="day-of-current-month"
                          style={{
                            border: `.1vmin solid ${borderColor}`,
                          }}
                        >
                          <div className="task-quantity">
                            {day.tasks > 0 && day.tasks}
                          </div>
                          <div
                            className="fill-green"
                            style={{
                              height:
                                (day.tasks / dataTasksForStats.daily_record) *
                                  100 +
                                "%",
                            }}
                          ></div>
                          <p className="day-text">{day.day.split("/")[0]}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="total-tasks">
                <h5 className="total-title">Total Stats</h5>
                <div className="content-total-tasks">
                  <p className="data-task">{tasksDoneForProfileData.length}</p>
                  <h5 className="data-title">Tasks completed</h5>
                  <p className="data-task">{allTasksForProfileData.length}</p>
                  <h5 className="data-title">Tasks created</h5>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
