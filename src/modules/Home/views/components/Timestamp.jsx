import { datesGenerator } from "dates-generator";
import React, { useEffect, useState } from "react";

import { ArrowDownIcon } from "../../../global/Icons";
import { days, months } from "./dateData";
import { TimestampItem } from "./TimestampItem";

export const Timestamp = ({ allTodos }) => {
  const today = new Date().toLocaleDateString().split("/");

  const [currentTime, setCurrentTime] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [currentWeek, setCurrentWeek] = useState([]);
  const [dateSelected, setDateSelected] = useState(
    new Date().toLocaleDateString()
  );

  useEffect(() => {
    handleSetWeek(currentTime, dateSelected);
  }, [currentTime, dateSelected]);

  const handleSetWeek = (timeSelected, dateSelected) => {
    const { dates } = datesGenerator(timeSelected);
    dates.filter((week) => {
      return week.find((day) => {
        if (day.jsDate.split(" ")[0] === dateSelected) {
          setCurrentWeek(week);
        }
      });
    });
  };

  const handleChangeWeek = (direction) => {
    const dayChanged =
      direction === "previous" ? currentTime.day - 7 : currentTime.day + 7;
    let weekChanged = new Date(currentTime.year, currentTime.month, dayChanged)
      .toLocaleDateString()
      .split("/");
    const month = weekChanged[1] - 1;
    const convertDate = `${weekChanged[0]}/${weekChanged[1]}/${weekChanged[2]}`;
    setCurrentTime({
      day: Number(weekChanged[0]),
      month: month,
      year: Number(weekChanged[2]),
    });
    setDateSelected(convertDate);
  };

  return (
    <>
      <div className="week-pagination">
        <ArrowDownIcon
          className="timestamp-arrow arrow-left"
          size="5"
          onClick={() => handleChangeWeek("previous")}
        />
        <h2>
          {Object.values(months[currentTime.month])} {currentWeek[0]?.date} -{" "}
          {currentWeek[6]?.date}
        </h2>
        <ArrowDownIcon
          className="timestamp-arrow arrow-right"
          size="5"
          onClick={() => handleChangeWeek("next")}
        />
      </div>
      <div className="timestamp">
        {currentWeek.map((day, index) => {
          return (
            <div className="content-days">
              <div className="day">
                <div
                  className="day-text"
                  style={{
                    background:
                      day.date == today[0] &&
                      currentTime.month + 1 == today[1] &&
                      "#0a425c",
                    color:
                      day.date == today[0] &&
                      currentTime.month + 1 == today[1] &&
                      "#fff",
                  }}
                >
                  <h3 className="text">
                    {days[index]} {day.date}
                  </h3>
                </div>
                <div className="day-tasks">
                  {allTodos.map((todo) => {
                    if (todo.date === day.jsDate.split(" ")[0]) {
                      return <TimestampItem todo={todo} />;
                    }
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
