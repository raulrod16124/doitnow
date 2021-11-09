import React from "react";

import List from "./List";

export const Today = ({
  allTodos,
  doneTodo,
  todo,
  inProgress,
  dragListDetected,
  handleDeleteTodoById,
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
      <div className="progress-bar">
        <div className="level-bar">
          <div
            className="green-fill"
            style={{
              width:
                allTodos.length > 0
                  ? (doneTodo.length / allTodos.length) * 100 + "%"
                  : 0 + "%",
            }}
          ></div>
        </div>
        <div className="task-counter">
          <p className="task-counter-text">
            {doneTodo.length} / {allTodos.length}
          </p>
        </div>
        <div className="experience-counter">
          <p className="experience-counter-text">{doneTodo.length * 50} exp.</p>
        </div>
      </div>
      <div className="content-body">
        <div className="content-lists">
          <List
            key="todo"
            droppableID="todo"
            list={todo}
            className={todoDragDetectedClass}
            titleList="TO DO"
            handleDeleteTodoById={handleDeleteTodoById}
            handleGetEditItem={handleGetEditItem}
          />
          <List
            key="inProgress"
            droppableID="inProgress"
            list={inProgress}
            className={inProgressDragDetectedClass}
            titleList="IN PROGRESS"
            handleDeleteTodoById={handleDeleteTodoById}
            handleGetEditItem={handleGetEditItem}
          />
          <List
            key="doneTodo"
            droppableID="done"
            list={doneTodo}
            className={doneDragDetectedClass}
            titleList="COMPLETED"
            handleDeleteTodoById={handleDeleteTodoById}
            handleGetEditItem={handleGetEditItem}
          />
        </div>
      </div>
    </div>
  );
};
