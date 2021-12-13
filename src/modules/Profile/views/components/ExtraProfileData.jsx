import React from "react";

export const ExtraProfileData = ({ dataTasksForStats }) => {
  return (
    <div className="content-extra-profile-data">
      <div className="daily-record">
        <i className="fas fa-fire icon daily"></i>
        <div className="content-data">
          <span className="data">
            <p className="data-number">{dataTasksForStats.daily_record} </p>
            <p className="data-text">tasks completed</p>
          </span>
          <p className="text">Daily Record</p>
        </div>
      </div>
      <div className="best-week-record">
        <i className="fas fa-medal icon week"></i>
        <div className="content-data">
          <span className="data">
            <p className="data-number">{dataTasksForStats.week_record} </p>
            <p className="data-text">tasks completed</p>
          </span>
          <p className="text">Week Record</p>
        </div>
      </div>
      <div className="best-streak">
        <i className="fas fa-trophy icon streak"></i>
        <div className="content-data">
          <span className="data">
            <p className="data-number">{dataTasksForStats.weekly_average} </p>
            <p className="data-text">tasks per week</p>
          </span>
          <p className="text">Weekly Average</p>
        </div>
      </div>
    </div>
  );
};
