import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Item from "./Item";

function List({
  droppableID,
  list,
  titleList,
  handleDeleteTodoById,
  className,
}) {
  // console.log(list);
  return (
    <Droppable droppableId={droppableID}>
      {(droppableProvided) => (
        <ul
          className={className}
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
        >
          <div className="header-list">
            <h2 className="list-title">{titleList}</h2>
            <span className="count">{Object.values(list).length}</span>
          </div>
          {Object.values(list).map((item, index) => {
            // console.log(item)
            return (
              <Item
                key={item.id}
                item={item}
                index={index}
                handleDeleteTodoById={handleDeleteTodoById}
              />
            );
          })}
          {droppableProvided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export default List;
