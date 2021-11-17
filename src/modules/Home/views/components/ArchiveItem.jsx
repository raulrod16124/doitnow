import React from "react";
import { useDispatch } from "react-redux";

import { OpenConfirmationPropmt } from "../../../global/ConfirmationPropmt/state/actions";
import { DeleteTask, UpdateTask } from "../../../Home/state/actions";
import { Tag } from "../../../Home/views/components/Tag";

export const ArchiveItem = ({ item }) => {
  const dispatch = useDispatch();

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

  return (
    <li className="item archive-item">
      <h3 className="item-title">
        {item.title} <span className="item-date">{item.date}</span>
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
        <p className="item-level">MODE: {item.level}</p>
        <div className="content-icons">
          <i
            className="fas fa-archive icon"
            onClick={() => handleUnarchiveCompletedTask(item)}
          ></i>
          <i
            className="fas fa-trash icon"
            onClick={() => handleDeleteItemById(item)}
          ></i>
        </div>
      </div>
    </li>
  );
};
