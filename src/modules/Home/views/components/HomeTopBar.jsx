import React, { useRef, useState } from "react";
import Calendar from "react-calendar";

import { Button } from "../../../../stories/Button";
import { Search } from "../../../../stories/Search";

export const HomeTopBar = ({
  handleGetVisibilityFormState,
  handleOrderTaskFiltered,
  handleGetTodoFilter,
  handleSearchArchiveTask,
  filterOptionsVisibility,
  setFilterOptionsVisibility,
  allTodos,
  viewSelected,
  handleArchiveVisibility,
}) => {
  // Filter options
  const [calendarDateValue, setCalendarDateValue] = useState(new Date());
  const [filterDate, setFilterDate] = useState("ALL");
  const [
    timestampSelectorVisibility,
    setTimestampSelectorVisibility,
  ] = useState(false);

  const optionInputRef = useRef();

  const handleFilterTask = (condition, value) => {
    switch (condition) {
      case "ALL":
        handleOrderTaskFiltered(allTodos);
        setFilterDate(condition);
        handleGetTodoFilter(condition);
        break;
      case "TODAY":
        const todayDay = allTodos.filter(
          (todo) => todo.date === new Date().toLocaleDateString()
        );
        handleOrderTaskFiltered(todayDay);
        setFilterDate(condition);
        handleGetTodoFilter(condition);
        break;
      case "CALENDAR":
        const selectCalendarDay = allTodos.filter(
          (todo) => todo.date === value.toLocaleDateString()
        );
        handleOrderTaskFiltered(selectCalendarDay);
        setFilterDate(value.toLocaleDateString());
        handleGetTodoFilter(condition);
        break;
      case "TAG":
        if (condition !== "") {
          const tagFilter = allTodos.filter((todo) => {
            if (todo.tags) {
              if (todo.tags[0] !== undefined && todo.tags[0].tag === value) {
                return todo;
              }
            }
          });
          handleOrderTaskFiltered(tagFilter);
          setFilterDate(value);
        }
        handleGetTodoFilter(condition);
        break;
      default:
        // handleOrderTaskFiltered(allTodos);
        setFilterDate(condition);
        handleGetTodoFilter(condition);
        break;
    }
    setFilterOptionsVisibility(false);
    setTimestampSelectorVisibility(false);
  };

  return (
    <div className="home-top-bar">
      {viewSelected.today && <div className="bg-mobile-top-bar"></div>}
      <div className="content-options-bar">
        <Button
          size="mediun"
          label="New task"
          onClick={() => handleGetVisibilityFormState(true)}
        />
        {viewSelected.today && (
          <div className="filter-content">
            <label className="filter-label">
              <i className="far fa-calendar-times"></i>
            </label>
            <div className="filter-options">
              <label
                className="day-selected"
                onClick={() => {
                  setTimestampSelectorVisibility(false);
                }}
              >
                <p className="day-selected-data">{filterDate}</p>
                <i className="fas fa-chevron-down icon"></i>
              </label>
              {filterOptionsVisibility && (
                <ul className="content-options">
                  <li
                    className="option"
                    onClick={() => handleFilterTask("ALL")}
                  >
                    All
                  </li>
                  <li
                    className="option"
                    onClick={() => handleFilterTask("TODAY")}
                  >
                    Today
                  </li>
                  <li
                    className="option calendar-selector"
                    onClick={() =>
                      setTimestampSelectorVisibility(
                        !timestampSelectorVisibility
                      )
                    }
                  >
                    Select day <i className="fas fa-chevron-right icon"></i>
                  </li>
                  {timestampSelectorVisibility && (
                    <div className="timeStamp-input">
                      <Calendar
                        locale="en-EN"
                        value={calendarDateValue}
                        onChange={() => setCalendarDateValue(calendarDateValue)}
                        onClickDay={(e) => handleFilterTask("CALENDAR", e)}
                      />
                    </div>
                  )}
                  <li className="option-tag">
                    <label className="option-tag-level">Search tag</label>
                    <div className="input-content">
                      <input
                        ref={optionInputRef}
                        className="option-tag-input"
                        type="text"
                        placeholder="Write your tag here"
                      />
                      <i
                        className="fas fa-search icon"
                        onClick={() =>
                          handleFilterTask("TAG", optionInputRef.current.value)
                        }
                      ></i>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
      {viewSelected.today && (
        <div className="search-component">
          <Search
            width="90"
            height="5"
            margin="0.5rem 2rem"
            onChange={handleSearchArchiveTask}
          />
        </div>
      )}
      <div
        className="show-archive-view"
        onClick={() => handleArchiveVisibility(true)}
      >
        <i className="fas fa-archive icon archive-icon"></i>
        <p className="archive-text">Archive tasks</p>
      </div>
    </div>
  );
};
