import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Item({ item, index, handleDeleteTodoById, handleGetEditItem }) {
  // ClassName Item controller
  let classNames = require("classnames");
  let itemClass = classNames(
    "item",
    { done: item.status === "done" },
    { "in-progress": item.status === "inProgress" }
    // {dragging: dragTaskDetected}
  );

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
              <div className="todo-footer">
                <p className="todo-level">MODE: {item.level}</p>
                <div className="content-icons">
                  <i
                    class="fas fa-edit icon"
                    onClick={() => handleGetEditItem(item)}
                  ></i>
                  <i
                    class="fas fa-trash icon"
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
