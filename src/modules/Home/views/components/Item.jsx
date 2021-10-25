import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import {
  CancelIcon,
  CheckSaveIcon,
  DeleteIcon,
  EditIcon,
} from "../../../global/Icons";
import { UpdateTask, UpdateTodos } from "../../state/actions";

function Item({ item, index, handleDeleteTodoById, editMode = false }) {
  const dispatch = useDispatch();

  const [todoData, setTodoData] = useState(item);
  // console.log(todoData)
  // Edit Todo Visibility
  const [editingItem, seteditingItem] = useState(editMode);

  const [dragTaskDetected, setdragTaskDetected] = useState(false);

  // ClassName Item controller
  let classNames = require("classnames");
  let itemClass = classNames(
    "item",
    { done: item.status === "done" },
    { "in-progress": item.status === "inProgress" }
    // {dragging: dragTaskDetected}
  );

  // Updated Todo
  const handleUpdatedTodo = (item) => {
    // console.log(item);
    if (item.title !== "") {
      dispatch(UpdateTask(item));
      seteditingItem(false);
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
              // onMouseDown={()=>setdragTaskDetected(true)}
              // onMouseUp={()=>setdragTaskDetected(false)}
              // onDrop={()=>setdragTaskDetected(false)}
            >
              {!editingItem ? (
                <>
                  <div className="content-todo">
                    <div className="content-data-todo-left">
                      <h3 className="todo-title">{item.title}</h3>
                      <p className="todo-level">MODE: {item.level}</p>
                      <div className="content-icons">
                        <EditIcon
                          className="icon"
                          size="3"
                          onClick={() => seteditingItem(true)}
                        />
                        <DeleteIcon
                          className="icon"
                          size="3"
                          onClick={() => handleDeleteTodoById(item.id)}
                        />
                      </div>
                    </div>
                    <div className="content-data-todo-rigth">
                      <p className="todo-description">{item.description}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* <EditTodo item={item} handleUpdatedTodo={handleUpdatedTodo} /> */}
                  <div className="content-todo">
                    <div className="content-data-todo-left editing">
                      <input
                        className="todo-title editing"
                        type="text"
                        value={todoData.title}
                        onChange={(e) =>
                          setTodoData({ ...todoData, title: e.target.value })
                        }
                      />
                      <select
                        className="todo-level editing"
                        defaultValue={todoData.level}
                        onClick={(e) =>
                          setTodoData({ ...todoData, level: e.target.value })
                        }
                      >
                        <option className="select-level">easy</option>
                        <option className="select-level">mediun</option>
                        <option className="select-level">hard</option>
                        <option className="select-level">killing</option>
                        <option className="select-level">💀</option>
                      </select>
                      <div className="content-icons">
                        <CheckSaveIcon
                          className="icon"
                          size="3"
                          onClick={() => handleUpdatedTodo(todoData)}
                        />
                        <CancelIcon
                          className="icon"
                          size="3"
                          onClick={() => seteditingItem(false)}
                        />
                      </div>
                    </div>
                    <div className="content-data-todo-rigth editing">
                      <textarea
                        className="todo-description editing"
                        value={todoData.description}
                        onChange={(e) =>
                          setTodoData({
                            ...todoData,
                            description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                </>
              )}
            </li>
          )}
        </Draggable>
      )}
    </>
  );
}

export default Item;
