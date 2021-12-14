import React, { useEffect, useState } from "react";

import { Search } from "../../../../stories/Search";
import { ArchiveItem } from "./ArchiveItem";

export const ArchiveTasks = ({ allTodos, handleArchiveVisibility }) => {
  const [archiveTasks, setArchiveTasks] = useState([]);
  const [filterArchiveTasks, setFilterArchiveTasks] = useState([]);

  useEffect(async () => {
    setArchiveTasks(allTodos.filter((task) => task.status === "archive"));
    setFilterArchiveTasks(allTodos.filter((task) => task.status === "archive"));
    // console.log(archiveTasks);
  }, []);

  const handleSearchArchiveTask = (e) => {
    if (e.target.value === "") {
      setFilterArchiveTasks(archiveTasks);
    }
    const searchingArchiveTask = archiveTasks.filter((task) => {
      if (
        task.title.includes(e.target.value) ||
        task.description.includes(e.target.value)
      ) {
        return task;
      }
    });
    setFilterArchiveTasks(searchingArchiveTask);
  };

  return (
    <div className="bg-archive">
      <div className="archive">
        <i
          className="far fa-window-close icon close-icon"
          onClick={() => handleArchiveVisibility(false)}
        ></i>
        <div className="top-content">
          <h2 className="archive-title">
            <i className="fas fa-archive icon archive-icon-title"></i>Archived
            tasks
          </h2>
          <div className="content-search">
            <Search
              width="60"
              margin="4vmin"
              onChange={(e) => handleSearchArchiveTask(e)}
            />
          </div>
        </div>
        <div className="content-archive-tasks">
          {filterArchiveTasks.length > 0 ? (
            filterArchiveTasks.map((item, index) => {
              return (
                <ArchiveItem key={item.id + index} item={item} index={index} />
              );
            })
          ) : (
            <h3 className="empty-message">There are no archived tasks yet</h3>
          )}
        </div>
        <p className="archive-count">{archiveTasks.length} tasks</p>
      </div>
    </div>
  );
};
