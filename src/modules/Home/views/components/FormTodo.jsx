import React, { useRef, useState } from "react";

import { Button } from "../../../../stories/Button";
import { Message } from "../../../global/Message";

export const FormTodo = ({ handleCreateTodo, handleFormVisbility }) => {
  const initialTodoState = {
    title: "",
    level: "easy",
    status: "todo",
    description: "",
  };

  // Todo state
  const [todo, setTodo] = useState(initialTodoState);

  // Section Selected
  const [sectionVisibility, setSectionVisibility] = useState({
    form: true,
    contacts: false,
    stats: false,
  });

  // Section class Selected controller
  let classNames = require("classnames");
  let sectionFormClass = classNames("section", {
    selected: sectionVisibility.form,
  });
  let sectionContacsClass = classNames("section", {
    selected: sectionVisibility.contacts,
  });
  let sectionStatsClass = classNames("section", {
    selected: sectionVisibility.stats,
  });

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
      return handleCreateTodo(newTask);
    } else {
      setError({ ...error, visible: true });
      setTimeout(() => {
        setError({ ...error, visible: false });
      }, 2500);
    }
  };

  return (
    <form className="form" onSubmit={handleSaveTodo}>
      <div className="logo-app">DoItNow</div>
      <ul className="content-sections">
        <li
          className={sectionFormClass}
          onClick={() =>
            setSectionVisibility({ form: true, contacts: false, stats: false })
          }
        >
          Task Form
        </li>
        <li
          className={sectionStatsClass}
          onClick={() =>
            setSectionVisibility({ form: false, contacts: false, stats: true })
          }
        >
          Stats
        </li>
        <li
          className={sectionContacsClass}
          onClick={() =>
            setSectionVisibility({ form: false, contacts: true, stats: false })
          }
        >
          Contacts
        </li>
      </ul>
      <div className="content-form">
        {sectionVisibility.form && (
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
        {sectionVisibility.contacts && (
          <p style={{ color: "#fff" }}>Here the contacts section</p>
        )}
        {sectionVisibility.stats && (
          <p style={{ color: "#fff" }}>Here the Stats section</p>
        )}
      </div>
    </form>
  );
};
