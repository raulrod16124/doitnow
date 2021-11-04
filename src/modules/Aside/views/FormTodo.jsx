import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { Button } from "../../../stories/Button";
import { Footer } from "../../global/Footer";
import { ArrowDownIcon } from "../../global/Icons";
import { Message } from "../../global/Message";
import { CreateTask } from "../../Home/state/actions";
import { HomeViewsVisibility } from "../state/action";

export const FormTodo = () => {
  const initialTodoState = {
    title: "",
    level: "easy",
    status: "todo",
    description: "",
  };

  const dispatch = useDispatch();

  const history = useHistory();

  let classNames = require("classnames");

  // Todo state
  const [todo, setTodo] = useState(initialTodoState);

  // Section Selected
  const [sectionVisibility, setSectionVisibility] = useState({
    home: true,
    stats: false,
    profile: false,
  });

  useEffect(() => {
    switch (history.location.pathname) {
      case "/home":
        setSectionVisibility({ home: true, stats: false, profile: false });
        break;
      case "/stats":
        setSectionVisibility({ home: false, stats: true, profile: false });
        break;
      case "/profile":
        setSectionVisibility({ home: false, stats: false, profile: true });
        break;
    }
  }, [history.location.pathname]);

  // Error State
  const [error, setError] = useState({
    visible: false,
    title: "Title is required",
  });

  // References
  const titleForm = useRef();
  const levelForm = useRef();
  const descriptionForm = useRef();
  const [Timestamp, setTimestamp] = useState(new Date());
  const [
    timestampSelectorVisibility,
    setTimestampSelectorVisibility,
  ] = useState(false);

  const handleGetStartDate = (e) => {
    setTimestampSelectorVisibility(false);
    console.log(e.toLocaleDateString());
    setTimestamp(e);
  };

  // home view selector
  const [homeView, setHomeView] = useState(false);
  const HomebgHideRef = useRef();
  let todayViewClass = classNames("home-view", { hide: homeView });
  let timestampViewClass = classNames("home-view", { hide: !homeView });

  const handleShowHomeViews = (view) => {
    if (view) {
      HomebgHideRef.current.style.left = "50%";
    } else {
      HomebgHideRef.current.style.left = "0";
    }
    dispatch(HomeViewsVisibility(view));
    setHomeView(view);
  };

  // Functions
  const handleSaveTodo = (e) => {
    e.preventDefault();
    setTodo({
      ...todo,
      title: titleForm.current.value,
      level: levelForm.current.value,
      description: descriptionForm.current.value,
      date: Timestamp.toLocaleDateString(),
    });
    if (todo.title !== "") {
      setTodo(initialTodoState);
      const userOwner = JSON.parse(localStorage.getItem("user"));
      const newTask = {
        title: titleForm.current.value,
        level: levelForm.current.value,
        status: "todo",
        description: descriptionForm.current.value,
        date: Timestamp.toLocaleDateString(),
        owner: userOwner.email,
      };

      titleForm.current.value = "";
      levelForm.current.value = "easy";
      descriptionForm.current.value = "";
      setTimestamp(new Date());

      dispatch(CreateTask(newTask));
    } else {
      setError({ ...error, visible: true });
      setTimeout(() => {
        setError({ ...error, visible: false });
      }, 2500);
    }
  };

  return (
    <div className="aside">
      {sectionVisibility.home && (
        <>
          <div className="home-view-selector">
            <p
              className={todayViewClass}
              onClick={() => handleShowHomeViews(false)}
            >
              Today
            </p>
            <p
              className={timestampViewClass}
              onClick={() => handleShowHomeViews(true)}
            >
              Timestamp
            </p>
            <div className="bg-hide" ref={HomebgHideRef}></div>
          </div>
          <form className="form" onSubmit={handleSaveTodo}>
            <div className="content-form">
              <div className="title-form">Create your task</div>
              <input
                className="form-title"
                ref={titleForm}
                type="text"
                placeholder="Title..."
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              />
              <select
                className="form-level"
                ref={levelForm}
                defaultValue="easy"
                onChange={(e) => setTodo({ ...todo, level: e.target.value })}
              >
                <option className="select-level">easy</option>
                <option className="select-level">medium</option>
                <option className="select-level">hard</option>
                <option className="select-level">killing</option>
                <option className="select-level">💀</option>
              </select>
              <div
                className="start-date-selector"
                onClick={() =>
                  setTimestampSelectorVisibility(!timestampSelectorVisibility)
                }
              >
                Start date: <span>{Timestamp.toLocaleDateString()}</span>
              </div>
              {timestampSelectorVisibility && (
                <div className="timeStamp-input">
                  <Calendar
                    locale="en-EN"
                    onChange={() => setTimestamp(Timestamp)}
                    value={Timestamp}
                    onClickDay={(e) => handleGetStartDate(e)}
                  />
                </div>
              )}
              <textarea
                className="form-description"
                ref={descriptionForm}
                placeholder="Description..."
                onChange={(e) =>
                  setTodo({ ...todo, description: e.target.value })
                }
              />
              <Button primary={true} size="large" label="Add new task" />
              <div className="content-message">
                {error.visible && (
                  <Message
                    children={error.title}
                    color="#ED4E2C"
                    padding=".5vh 2vw"
                    margin="5vh auto"
                  />
                )}
              </div>
            </div>
          </form>
        </>
      )}
      {sectionVisibility.stats && (
        <p style={{ color: "#fff" }}>Here the Stats section</p>
      )}
      {sectionVisibility.profile && (
        <p style={{ color: "#fff" }}>Here the Profile section</p>
      )}
      <Footer />
    </div>
  );
};
