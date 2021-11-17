import React from "react";

import List from "./List";

export const Today = ({
  doneTodo,
  todo,
  inProgress,
  dragListDetected,
  handleGetEditItem,
}) => {
  // Class Detect dragging in List
  let classNames = require("classnames");
  let todoDragDetectedClass = classNames("list", {
    dragging: dragListDetected.todo,
  });
  let inProgressDragDetectedClass = classNames("list", {
    dragging: dragListDetected.inProgress,
  });
  let doneDragDetectedClass = classNames("list", {
    dragging: dragListDetected.done,
  });

  return (
    <div className="today-main">
      <div className="content-body">
        <div className="content-lists">
          <List
            key="todo"
            droppableID="todo"
            list={todo}
            className={todoDragDetectedClass}
            titleList="TO DO"
            handleGetEditItem={handleGetEditItem}
          />
          <List
            key="inProgress"
            droppableID="inProgress"
            list={inProgress}
            className={inProgressDragDetectedClass}
            titleList="IN PROGRESS"
            handleGetEditItem={handleGetEditItem}
          />
          <List
            key="doneTodo"
            droppableID="done"
            list={doneTodo}
            className={doneDragDetectedClass}
            titleList="COMPLETED"
            handleGetEditItem={handleGetEditItem}
          />
        </div>
      </div>
    </div>
  );
};
