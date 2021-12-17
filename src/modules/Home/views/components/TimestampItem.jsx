import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { OpenConfirmationPropmt } from "../../../global/ConfirmationPropmt/state/actions";
import { DeleteTask, UpdateTask } from "../../state/actions";

export const TimestampItem = ({ item, handleGetEditItem }) => {
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

  const [descriptionVisibility, setdescriptionVisibility] = useState(false);

  const handleDescribeVisinility = () => {
    // console.log("OP");
    setdescriptionVisibility(!descriptionVisibility);
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

  const handleArchiveCompletedTask = (item) => {
    item.status = "archive";
    dispatch(
      OpenConfirmationPropmt({
        message: `Do you want to archive the task ${item.title} ?`,
        acceptButton: "Archive",
        handleAccept: () => UpdateTask(item.id, item),
      })
    );
  };

  const handleToggleMenuResponsive = (param) => {
    if (param === "open") {
      menuResponsiveRef.current.style.display = "flex";
      setTimeout(() => {
        menuResponsiveRef.current.style.height = "auto";
        menuResponsiveRef.current.style.width = "60%";
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
    <div
      className={`${itemClass} timestamp`}
      onClick={(e) => {
        if (
          e.target.className !== "item-menu-responsive" &&
          e.target.className !== "options" &&
          e.target.className !== "option" &&
          e.target.className !== "fas fa-ellipsis-v icon-item-settings"
        ) {
          handleToggleMenuResponsive();
        }
      }}
    >
      <h3 className="todo-title">
        {item.title}{" "}
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
      {descriptionVisibility && (
        <p className="todo-description">{item.description}</p>
      )}
      <div className="item-timestamp-footer">
        <div className="circle-status"></div>
        <div className="content-icons">
          <i
            className="fas fa-edit icon"
            onClick={() => handleGetEditItem(item)}
          ></i>
          <i
            className="fas fa-trash icon"
            onClick={() => handleDeleteItemById(item)}
          ></i>
          <i
            className="fas fa-ellipsis-v icon-item-settings"
            onClick={() => handleToggleMenuResponsive("open")}
          ></i>
        </div>
      </div>
    </div>
  );
};
