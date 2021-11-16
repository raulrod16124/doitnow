import React, { useState } from "react";

export const TimestampItem = ({
  todo,
  handleGetEditItem,
  handleDeleteTodoById,
}) => {
  // ClassName Item controller
  let classNames = require("classnames");
  let itemClass = classNames(
    "item",
    { done: todo.status === "done" || todo.status === "archive" },
    { "in-progress": todo.status === "inProgress" }
    // {dragging: dragTaskDetected}
  );

  const [descriptionVisibility, setdescriptionVisibility] = useState(false);

  const handleDescribeVisinility = () => {
    console.log("OP");
    setdescriptionVisibility(!descriptionVisibility);
  };

  return (
    <div className={`${itemClass} timestamp`}>
      <h3 className="todo-title">
        {todo.title}{" "}
        {descriptionVisibility ? (
          <i
            className="fas fa-chevron-up icon arrow"
            onClick={handleDescribeVisinility}
          ></i>
        ) : (
          <i
            className="fas fa-chevron-down icon arrow"
            onClick={handleDescribeVisinility}
          ></i>
        )}
      </h3>
      {descriptionVisibility && (
        <p className="todo-description">{todo.description}</p>
      )}
      <div className="item-timestamp-footer">
        <div className="circle-status"></div>
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
    </div>
  );
};
