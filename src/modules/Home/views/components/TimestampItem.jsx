import React from "react";

export const TimestampItem = ({
  todo,
  handleGetEditItem,
  handleDeleteTodoById,
}) => {
  // ClassName Item controller
  let classNames = require("classnames");
  let itemClass = classNames(
    "item",
    { done: todo.status === "done" },
    { "in-progress": todo.status === "inProgress" }
    // {dragging: dragTaskDetected}
  );

  return (
    <div className={`${itemClass} timestamp`}>
      <h3 className="todo-title">{todo.title}</h3>
      <p className="todo-description">{todo.description}</p>
      <div className="content-icons">
        <i
          className="fas fa-edit icon"
          onClick={() => handleGetEditItem(todo)}
        ></i>
        <i
          className="fas fa-trash icon"
          onClick={() => handleDeleteTodoById(todo.id)}
        ></i>
      </div>
    </div>
  );
};
