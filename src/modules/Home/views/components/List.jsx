import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import Item from "./Item";

function List({
  droppableID,
  list,
  titleList,
  handleDeleteTodoById,
  className,
  handleGetEditItem,
}) {
  // console.log(list);

  // Extend List View Controller
  const [seeMore, setSeeMore] = useState(3);
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
          {Object.values(list)
            .slice(0, seeMore)
            .map((item, index) => {
              // console.log(item)
              return (
                <Item
                  key={item.id}
                  item={item}
                  index={index}
                  handleDeleteTodoById={handleDeleteTodoById}
                  handleGetEditItem={handleGetEditItem}
                />
              );
            })}
          {droppableProvided.placeholder}
          {Object.values(list).length > 3 && (
            <>
              {seeMore === 3 ? (
                <p className="see-more" onClick={() => setSeeMore(1000)}>
                  See more ({Object.values(list).length})
                </p>
              ) : (
                <p className="see-more" onClick={() => setSeeMore(3)}>
                  See less
                </p>
              )}
            </>
          )}
        </ul>
      )}
    </Droppable>
  );
}

export default List;
