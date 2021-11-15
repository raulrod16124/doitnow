import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { Tag } from "./Tag";

function Item({ item, index, handleDeleteTodoById, handleGetEditItem }) {
  // ClassName Item controller
  let classNames = require("classnames");
  let itemClass = classNames(
    "item",
    { done: item.status === "done" },
    { "in-progress": item.status === "inProgress" }
    // {dragging: dragTaskDetected}
  );

  const handleArchiveCompletedTask = () => {
    console.log(item);
    // dispatch(UpdateTask(todo.id, newTask));
  };

  return (
    <>
      {item && (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(draggableProvided) => (
            <li
              className={itemClass}
              {...draggableProvided.draggableProps}
              ref={draggableProvided.innerRef}
              {...draggableProvided.dragHandleProps}
            >
              <h3 className="todo-title">
                {item.title} <span className="todo-date">{item.date}</span>
              </h3>
              <p className="todo-description">{item.description}</p>
              <div className="content-tags">
                {item.tags &&
                  item.tags.length > 0 &&
                  item.tags.map((tag) => {
                    return <Tag key={tag.tag} tag={tag} />;
                  })}
              </div>
              <div className="todo-footer">
                <p className="todo-level">MODE: {item.level}</p>
                <div className="content-icons">
                  <i
                    className="fas fa-edit icon"
                    onClick={() => handleGetEditItem(item)}
                  ></i>
                  {item.status === "done" && (
                    <i
                      className="fas fa-archive icon"
                      onClick={handleArchiveCompletedTask}
                    ></i>
                  )}
                  <i
                    className="fas fa-trash icon"
                    onClick={() => handleDeleteTodoById(item.id)}
                  ></i>
                </div>
              </div>
            </li>
          )}
        </Draggable>
      )}
    </>
  );
}

export default Item;
