import React, { useState } from "react";
import { useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import { OpenConfirmationPropmt } from "../../../global/ConfirmationPropmt/state/actions";
import { DeleteTask, UpdateTask } from "../../state/actions";
import { Tag } from "./Tag";

function Item({ item, index, handleGetEditItem }) {
  const dispatch = useDispatch();

  const menuResponsiveRef = useRef();

  // ClassName Item controller
  let classNames = require("classnames");
  let itemClass = classNames(
    "item",
    { done: item.status === "done" || item.status === "archive" },
    { "in-progress": item.status === "inProgress" }
    // {dragging: dragTaskDetected}
  );

  const handleArchiveCompletedTask = (item) => {
    // console.log(item);
    item.status = "archive";
    dispatch(
      OpenConfirmationPropmt({
        message: `Do you want to archive the task ${item.title} ?`,
        acceptButton: "Archive",
        handleAccept: () => UpdateTask(item.id, item),
      })
    );
  };

  const handleDeleteItemById = (item) => {
    dispatch(
      OpenConfirmationPropmt({
        message: `Do you want to delete the task ${item.title} ?`,
        acceptButton: "Delete",
        handleAccept: () => DeleteTask(item.id),
      })
    );
  };

  const handleToggleMenuResponsive = (param) => {
    if (param === "open") {
      menuResponsiveRef.current.style.display = "flex";
      setTimeout(() => {
        menuResponsiveRef.current.style.height = "auto";
        menuResponsiveRef.current.style.width = "40%";
      }, 100);
    } else {
      menuResponsiveRef.current.style.display = "none";
      setTimeout(() => {
        menuResponsiveRef.current.style.height = "0%";
        menuResponsiveRef.current.style.width = "0%";
      }, 200);
    }
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
              onClick={(e) => {
                if (
                  e.target.className !== "item-menu-responsive" &&
                  e.target.className !== "options" &&
                  e.target.className !== "option" &&
                  e.target.className !==
                    "fas fa-ellipsis-v icon icon-item-settings"
                ) {
                  handleToggleMenuResponsive();
                }
              }}
            >
              <div className="item-menu-responsive" ref={menuResponsiveRef}>
                <ul className="options">
                  <p
                    className="option"
                    onClick={() => {
                      handleGetEditItem(item);
                      handleToggleMenuResponsive();
                    }}
                  >
                    Edit
                  </p>
                  {item.status === "done" && (
                    <p
                      className="option"
                      onClick={() => {
                        handleArchiveCompletedTask(item);
                        handleToggleMenuResponsive();
                      }}
                    >
                      Archive
                    </p>
                  )}
                  <p
                    className="option"
                    onClick={() => {
                      handleDeleteItemById(item);
                      handleToggleMenuResponsive();
                    }}
                  >
                    Delete
                  </p>
                </ul>
              </div>
              <h3 className="todo-title">
                {item.title} <span className="todo-date">{item.date}</span>
                <i
                  className="fas fa-ellipsis-v icon icon-item-settings"
                  onClick={() => handleToggleMenuResponsive("open")}
                ></i>
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
                <p className="todo-level">{item.level}</p>
                <div className="content-icons">
                  <i
                    className="fas fa-edit icon"
                    onClick={() => handleGetEditItem(item)}
                  ></i>
                  {item.status === "done" && (
                    <i
                      className="fas fa-archive icon"
                      onClick={() => handleArchiveCompletedTask(item)}
                    ></i>
                  )}
                  <i
                    className="fas fa-trash icon"
                    // onClick={() => handleDeleteTodoById(item.id)}
                    onClick={() => handleDeleteItemById(item)}
                  ></i>
                  <span className="todo-date-responsive">{item.date}</span>
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
