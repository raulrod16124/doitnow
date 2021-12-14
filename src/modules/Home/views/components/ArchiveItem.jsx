import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import { OpenConfirmationPropmt } from "../../../global/ConfirmationPropmt/state/actions";
import { DeleteTask, UpdateTask } from "../../../Home/state/actions";
import { Tag } from "../../../Home/views/components/Tag";

export const ArchiveItem = ({ item }) => {
  const dispatch = useDispatch();

  const menuResponsiveRef = useRef();

  const handleUnarchiveCompletedTask = (item) => {
    item.status = "done";
    dispatch(
      OpenConfirmationPropmt({
        message: `Do you want to unarchive the task ${item.title} ?`,
        acceptButton: "Unarchive",
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
    <li
      className="item archive-item"
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
      <h3 className="item-title">
        {item.title} <span className="item-date">{item.date}</span>
        <i
          class="fas fa-ellipsis-v icon-item-settings"
          onClick={() => handleToggleMenuResponsive("open")}
        ></i>
      </h3>
      <p className="item-description">{item.description}</p>
      <div className="content-tags">
        {item.tags &&
          item.tags.length > 0 &&
          item.tags.map((tag) => {
            return <Tag key={tag.tag} tag={tag} />;
          })}
      </div>
      <div className="item-footer">
        <p className="item-level">{item.level}</p>
        <div className="content-icons" ref={menuResponsiveRef}>
          <i
            className="fas fa-archive icon"
            onClick={() => handleUnarchiveCompletedTask(item)}
          ></i>
          <i
            className="fas fa-trash icon"
            onClick={() => handleDeleteItemById(item)}
          ></i>
        </div>
        <span className="item-date-responsive">{item.date}</span>
      </div>
      <div className="item-menu-responsive" ref={menuResponsiveRef}>
        <ul className="options">
          {item.status === "archive" && (
            <p
              className="option"
              onClick={() => {
                handleUnarchiveCompletedTask(item);
                handleToggleMenuResponsive();
              }}
            >
              Unarchive
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
    </li>
  );
};
