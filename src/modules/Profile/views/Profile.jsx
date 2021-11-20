import "react-circular-progressbar/dist/styles.css";

import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "../../global/Loading";
import { months } from "../../Home/views/components/dateData";
import { GetUserProfile } from "../state/actions";
import { DailyRecord, WeekRecord, weeklyAverage } from "./components/DataLogic";

export const Profile = () => {
  const profileState = useSelector((state) => {
    return state.ProfileReducer;
  });

  const dispatch = useDispatch();

  const [userData, setUserData] = useState(undefined);

  const avatarImg = useRef();

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

  const [previousMonthlyActivity, setPreviousMonthlyActivity] = useState([]);
  const [currentMonthlyActivity, setCurrentMonthlyActivity] = useState([]);

  const [dataTasksForStats, setDataTasksForStats] = useState({
    daily_record: 0,
    week_record: 0,
    weekly_average: 0,
  });

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
      setcircleBarValue(
        doneTasks.filter((task) => task.date.split("/")[1] == currentMonth + 1)
          .length /
          profileTasksData.filter(
            (task) => task.date.split("/")[1] == currentMonth + 1
          ).length
      );
      handleGetStatsData(profileTasksData);
      handleGetCurrentMonthlyActivity(profileTasksData);
      handleGetCurrentMonthlyActivity(profileTasksData, "prev");
    }
  }, []);

  const levelBar =
    allTasksForProfileData.length > 0
      ? (tasksDoneForProfileData.length / (5000 / 50)) * 100 + "%"
      : 0 + "%";

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
                  value={circleBarValue > 0 && circleBarValue}
                  maxValue={1}
                  text={`${Math.round(
                    circleBarValue > 0 ? circleBarValue * 100 : 0
                  )}%`}
                  styles={buildStyles({
                    textSize: "1.8vmin",
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
                        (task) => task.date.split("/")[1] == currentMonth + 1
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
            <div className="content-extra-profile-data">
              <div className="daily-record">
                <i className="fas fa-fire icon daily"></i>
                <div className="content-data">
                  <span className="data">
                    {dataTasksForStats.daily_record}{" "}
                    <p className="data-text">tasks completed</p>
                  </span>
                  <p className="text">Daily Record</p>
                </div>
              </div>
              <div className="best-week-record">
                <i className="fas fa-medal icon week"></i>
                <div className="content-data">
                  <span className="data">
                    {dataTasksForStats.week_record}{" "}
                    <p className="data-text">tasks completed</p>
                  </span>
                  <p className="text">Week Record</p>
                </div>
              </div>
              <div className="best-streak">
                <i className="fas fa-trophy icon streak"></i>
                <div className="content-data">
                  <span className="data">
                    {dataTasksForStats.weekly_average}{" "}
                    <p className="data-text">tasks per week</p>
                  </span>
                  <p className="text">Weekly Average</p>
                </div>
              </div>
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
              <p className="data-task">{tasksDoneForProfileData.length}</p>
              <h5 className="data-title">Tasks completed</h5>
              <p className="data-task">{allTasksForProfileData.length}</p>
              <h5 className="data-title">Tasks created</h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
