import React from "react";

export const TimestampItem = ({ todo }) => {
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
    </div>
  );
};
