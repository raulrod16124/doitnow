import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { Button } from "../../stories/Button";
import { Footer } from "../global/Footer";
import { Message } from "../global/Message";
import { CreateTask } from "../Home/state/actions";

export const FormTodo = () => {
  const initialTodoState = {
    title: "",
    level: "easy",
    status: "todo",
    description: "",
  };

  const dispatch = useDispatch();

  const history = useHistory();

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

  // Functions
  const handleSaveTodo = (e) => {
    e.preventDefault();
    setTodo({
      ...todo,
      title: titleForm.current.value,
      level: levelForm.current.value,
      description: descriptionForm.current.value,
    });
    if (todo.title !== "") {
      setTodo(initialTodoState);
      const userOwner = JSON.parse(localStorage.getItem("user"));
      const newTask = {
        title: titleForm.current.value,
        level: levelForm.current.value,
        status: "todo",
        description: descriptionForm.current.value,
        date: new Date().toLocaleDateString(),
        owner: userOwner.email,
      };

      titleForm.current.value = "";
      levelForm.current.value = "easy";
      descriptionForm.current.value = "";

      dispatch(CreateTask(newTask));
    } else {
      setError({ ...error, visible: true });
      setTimeout(() => {
        setError({ ...error, visible: false });
      }, 2500);
    }
  };

  return (
    <form className="form" onSubmit={handleSaveTodo}>
      <div className="content-form">
        {sectionVisibility.home && (
          <>
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
          </>
        )}
        {sectionVisibility.stats && (
          <p style={{ color: "#fff" }}>Here the Stats section</p>
        )}
        {sectionVisibility.profile && (
          <p style={{ color: "#fff" }}>Here the Profile section</p>
        )}
      </div>
      <Footer />
    </form>
  );
};
