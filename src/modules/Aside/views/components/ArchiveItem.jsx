import React from "react";
import { useDispatch } from "react-redux";

import { UpdateTask } from "../../../Home/state/actions";
import { Tag } from "../../../Home/views/components/Tag";

export const ArchiveItem = ({ item, handleDeleteTodoById }) => {
  const dispatch = useDispatch();

  const handleUnarchiveCompletedTask = () => {
    item.status = "done";
    console.log(item);
    dispatch(UpdateTask(item.id, item));
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
            onClick={handleUnarchiveCompletedTask}
          ></i>
          <i
            className="fas fa-trash icon"
            onClick={() => handleDeleteTodoById(item.id)}
          ></i>
        </div>
      </div>
    </li>
  );
};
