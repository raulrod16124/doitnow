import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { CirclePicker } from "react-color";
import { useDispatch } from "react-redux";

import { Button } from "../../../../stories/Button";
import { Message } from "../../../global/Message";
import { CreateTask, UpdateTask } from "../../state/actions";
import { Tag } from "./Tag";

export const FormTodo = ({
  handleGetVisibilityFormState,
  itemToEdit = undefined,
}) => {
  const initialTodoState = {
    title: "",
    level: "easy",
    status: "todo",
    description: "",
    tags: [],
    date: new Date().toLocaleDateString(),
  };

  const dispatch = useDispatch();

  // Todo state
  const [todo, setTodo] = useState(initialTodoState);

  const tagRef = useRef();

  const [showColors, setshowColors] = useState({
    visibility: false,
    color: "#63CFE0",
  });

  useEffect(() => {
    setTodo(initialTodoState);
    if (itemToEdit !== undefined) {
      setTodo(itemToEdit);
    } else {
      setTodo(initialTodoState);
    }
  }, []);

  // Error State
  const [error, setError] = useState({
    visible: false,
    title: "Title is required",
  });

  // References
  const [Timestamp, setTimestamp] = useState(new Date());
  const [
    timestampSelectorVisibility,
    setTimestampSelectorVisibility,
  ] = useState(false);

  const handleGetStartDate = (e) => {
    setTimestampSelectorVisibility(false);
    // console.log(e.toLocaleDateString());
    setTimestamp(e);
    setTodo({ ...todo, date: e.toLocaleDateString() });
  };

  const handleSaveTodo = (e) => {
    e.preventDefault();
    if (todo.title !== "") {
      const userOwner = JSON.parse(localStorage.getItem("user"));
      const newTask = {
        title: todo.title,
        level: todo.level,
        status: todo.status,
        description: todo.description,
        date: todo.date,
        tags: todo.tags,
        owner: userOwner.email,
      };
      setTimestamp(new Date());
      if (itemToEdit !== undefined) {
        dispatch(UpdateTask(todo.id, newTask));
      } else {
        dispatch(CreateTask(newTask));
      }
      setTodo(initialTodoState);
      handleGetVisibilityFormState(false);
    } else {
      setError({ ...error, visible: true });
      setTimeout(() => {
        setError({ ...error, visible: false });
      }, 2500);
    }
  };

  const handleSetTags = () => {
    const newTag = tagRef.current.value;
    if (todo.tags) {
      setTodo({
        ...todo,
        tags: [...todo.tags, { tag: newTag, color: showColors.color }],
      });
    } else {
      setTodo({
        ...todo,
        ["tags"]: [{ tag: newTag, color: showColors.color }],
      });
    }
    tagRef.current.value = "";
  };

  const handleDeleteTag = (tagToDelete) => {
    const updateTags = todo.tags.filter((tag) => tag.tag !== tagToDelete);
    setTodo({ ...todo, tags: updateTags });
  };

  return (
    <div
      className="bg-form"
      onClick={(e) =>
        e.target.className === "bg-form" && handleGetVisibilityFormState(false)
      }
    >
      <form className="form">
        <div className="content-form">
          <div className="title-form">
            {itemToEdit === undefined ? "Create your task" : "Editing"}
          </div>
          <input
            className="form-title"
            value={todo.title}
            type="text"
            placeholder="Title..."
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <select
            className="form-level"
            defaultValue={todo.level}
            onChange={(e) => setTodo({ ...todo, level: e.target.value })}
          >
            <option className="select-level">easy</option>
            <option className="select-level">medium</option>
            <option className="select-level">hard</option>
            <option className="select-level">killing</option>
            <option className="select-level">💀</option>
          </select>
          <select
            className="form-status"
            defaultValue="-- select --"
            onChange={(e) => setTodo({ ...todo, status: e.target.value })}
          >
            <option
              className="select-level"
              value="-- select --"
              disabled
              selected
            >
              -- select --
            </option>
            <option className="select-level" value="todo">
              To Do
            </option>
            <option className="select-level" value="inProgress">
              In Progress
            </option>
            <option className="select-level" value="done">
              Completed
            </option>
          </select>
          <div
            className="start-date-selector"
            onClick={() =>
              setTimestampSelectorVisibility(!timestampSelectorVisibility)
            }
          >
            Start date: <span>{todo.date}</span>
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
            value={todo.description}
            placeholder="Description..."
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
          <div className="content-tag-input">
            {showColors && showColors.visibility && (
              <CirclePicker
                className="color-selector"
                color={showColors.color}
                onClick={(e) =>
                  e.target.className !== "color-selector" &&
                  handleGetVisibilityFormState(false)
                }
                onChangeComplete={(e) =>
                  setshowColors({ visibility: false, color: e.hex })
                }
              />
            )}
            <div
              className="color-selected"
              style={{ backgroundColor: showColors.color }}
              onClick={() => {
                setshowColors({
                  ...showColors,
                  visibility: !showColors.visibility,
                });
              }}
            ></div>
            <input
              ref={tagRef}
              type="text"
              className="form-tag"
              placeholder="Write your tag here"
            />
            <i className="fas fa-plus-square icon" onClick={handleSetTags}></i>
          </div>
          <div className="content-tags">
            {todo.tags &&
              todo.tags.length > 0 &&
              todo.tags.map((tag) => {
                return (
                  <Tag
                    key={tag.tag}
                    tag={tag}
                    handleDeleteTag={handleDeleteTag}
                  />
                );
              })}
          </div>
          <Button
            size="large"
            label={itemToEdit === undefined ? "Create" : "Update"}
            onClick={(e) => handleSaveTodo(e)}
          />
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
        <i
          className="far fa-window-close icon close-icon"
          onClick={() => {
            handleGetVisibilityFormState(false);
            setTodo(initialTodoState);
          }}
        ></i>
      </form>
    </div>
  );
};
