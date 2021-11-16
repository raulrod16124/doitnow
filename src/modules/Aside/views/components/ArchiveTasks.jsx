import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ArchiveItem } from "./ArchiveItem";

export const ArchiveTasks = ({ handleArchiveVisibility }) => {
  const todosState = useSelector((state) => {
    return state.TodosReducer;
  });

  const [archiveTasks, setArchiveTasks] = useState([]);

  useEffect(() => {
    const profileTasksData = JSON.parse(localStorage.getItem("tasks"));
    setArchiveTasks(
      profileTasksData.filter((task) => task.status === "archive")
    );
    console.log(archiveTasks);
  }, [todosState]);

  return (
    <div className="bg-archive">
      <div className="archive">
        <i
          className="far fa-window-close icon close-icon"
          onClick={() => handleArchiveVisibility(false)}
        ></i>
        <h2 className="archive-title">
          <i className="fas fa-archive icon archive-icon-title"></i>Archived
          tasks
        </h2>
        <div className="content-archive-tasks">
          {archiveTasks.length > 0 &&
            archiveTasks.map((item, index) => {
              return (
                <ArchiveItem key={item.id + index} item={item} index={index} />
              );
            })}
        </div>
      </div>
    </div>
  );
};
