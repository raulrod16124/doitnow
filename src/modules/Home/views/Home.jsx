import React, { useContext, useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

import { AuthContext } from "../../../auth/Auth";
import { Button } from "../../../stories/Button";
import { Loading } from "../../global/Loading";
import { DeleteTask, GetTasks, UpdateTask } from "../state/actions";
import { DragDropController } from "./components/DragDropController";
import { FormTodo } from "./components/FormTodo";
import { Timestamp } from "./components/Timestamp";
import { Today } from "./components/Today";

export const Home = () => {
  // listenners
  const todosState = useSelector((state) => {
    return state.TodosReducer;
  });

  const homeViewState = useSelector((state) => {
    return state.AsideReducer;
  });

  const dispatch = useDispatch();

  // Loading

  const [loadingVisibility, setLoadingVisibility] = useState(true);

  // Tasks states
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [doneTodo, setDoneTodo] = useState([]);

  const [allTodos, setAllTodos] = useState([]);
  const [alltasksFiltered, setAlltasksFiltered] = useState(allTodos);

  const [todoFilter, setTodoFilter] = useState("All");

  const [dragListDetected, setDragListDetected] = useState({
    todo: false,
    inProgress: false,
    done: false,
  });

  const [formVisibility, setFormVisibility] = useState(false);

  const handleGetVisibilityFormState = (boolean) => {
    setFormVisibility(boolean);
    setItemToEdit(undefined);
  };

  // const [ dragTaskDetected, setDragTaskDetected] = useState();

  // User Access
  const userLogged = useContext(AuthContext);

  useEffect(async () => {
    if (userLogged.currentUser) {
      dispatch(GetTasks(userLogged.currentUser.email));
      return <Redirect to="/" />;
    }
  }, [userLogged]);

  useEffect(async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (
      todosState.status === "task created" ||
      todosState.status === "task deleted" ||
      todosState.status === "task updated"
    ) {
      dispatch(GetTasks(userData.email));
    }
    if (todosState.status === "success" && todoFilter === "All") {
      console.log(todosState);
      handleOrderTaskPerStatus(todosState.data);
      setAllTodos(todosState.data);
      setLoadingVisibility(false);
    }
  }, [todosState]);

  const handleOrderTaskPerStatus = (allTasks) => {
    setTodo(() => allTasks.filter((item) => item.status === "todo"));
    setInProgress(() =>
      allTasks.filter((item) => item.status === "inProgress")
    );
    setDoneTodo(() => allTasks.filter((item) => item.status === "done"));
    setAlltasksFiltered(allTasks);
  };

  // Filter options
  const [calendarDateValue, setCalendarDateValue] = useState(new Date());
  const [filterDate, setFilterDate] = useState("ALL");
  const [
    timestampSelectorVisibility,
    setTimestampSelectorVisibility,
  ] = useState(false);

  const [filterVisibility, setFilterVisibility] = useState(false);

  const optionInputRef = useRef();

  const handleFilterTask = (condition, value) => {
    switch (condition) {
      case "ALL":
        handleOrderTaskPerStatus(allTodos);
        setFilterDate(condition);
        setTodoFilter(condition);
        break;
      case "TODAY":
        const todayDay = allTodos.filter(
          (todo) => todo.date === new Date().toLocaleDateString()
        );
        handleOrderTaskPerStatus(todayDay);
        setFilterDate(condition);
        setTodoFilter(condition);
        break;
      case "CALENDAR":
        const selectCalendarDay = allTodos.filter(
          (todo) => todo.date === value.toLocaleDateString()
        );
        handleOrderTaskPerStatus(selectCalendarDay);
        setFilterDate(value.toLocaleDateString());
        setTodoFilter(condition);
        break;
      case "TAG":
        if (condition !== "") {
          const tagFilter = allTodos.filter((todo) => {
            if (todo.tags) {
              if (todo.tags[0] !== undefined && todo.tags[0].tag === value) {
                return todo;
              }
            }
          });
          handleOrderTaskPerStatus(tagFilter);
          setFilterDate(value);
        }
        setTodoFilter(condition);
        break;
      default:
        handleOrderTaskPerStatus(allTodos);
        setFilterDate(condition);
        setTodoFilter(condition);
        break;
    }
    setFilterVisibility(false);
    setTimestampSelectorVisibility(false);
  };

  const handleDeleteTodoById = (idTodo) => {
    dispatch(DeleteTask(idTodo));
  };

  // Function to reorder a List
  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDragEnd = (result) => {
    // setDragTaskDetected(null);
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      switch (true) {
        case source.droppableId === "todo" &&
          destination.droppableId === "inProgress":
          const {
            taskToMove: todoToMove1,
            sourceListUpdated: listUpdated1,
          } = DragDropController({
            sourceList: todo,
            destinationStatus: "inProgress",
            draggableID: draggableId,
          });
          dispatch(UpdateTask(todoToMove1[0].id, todoToMove1[0]));
          setTodo(listUpdated1);
          setInProgress([...inProgress, todoToMove1[0]]);
          break;
        case source.droppableId === "todo" &&
          destination.droppableId === "done":
          const {
            taskToMove: todoToMove2,
            sourceListUpdated: listUpdated2,
          } = DragDropController({
            sourceList: todo,
            destinationStatus: "done",
            draggableID: draggableId,
          });
          dispatch(UpdateTask(todoToMove2[0].id, todoToMove2[0]));
          setTodo(listUpdated2);
          setDoneTodo([...doneTodo, todoToMove2[0]]);
          break;
        case source.droppableId === "inProgress" &&
          destination.droppableId === "todo":
          const {
            taskToMove: todoToMove3,
            sourceListUpdated: listUpdated3,
          } = DragDropController({
            sourceList: inProgress,
            destinationStatus: "todo",
            draggableID: draggableId,
          });
          dispatch(UpdateTask(todoToMove3[0].id, todoToMove3[0]));
          setInProgress(listUpdated3);
          setTodo([...todo, todoToMove3[0]]);
          break;
        case source.droppableId === "inProgress" &&
          destination.droppableId === "done":
          const {
            taskToMove: todoToMove4,
            sourceListUpdated: listUpdated4,
          } = DragDropController({
            sourceList: inProgress,
            destinationStatus: "done",
            draggableID: draggableId,
          });
          dispatch(UpdateTask(todoToMove4[0].id, todoToMove4[0]));
          setInProgress(listUpdated4);
          setDoneTodo([...doneTodo, todoToMove4[0]]);
          break;
        case source.droppableId === "done" &&
          destination.droppableId === "todo":
          const {
            taskToMove: todoToMove5,
            sourceListUpdated: listUpdated5,
          } = DragDropController({
            sourceList: doneTodo,
            destinationStatus: "todo",
            draggableID: draggableId,
          });
          dispatch(UpdateTask(todoToMove5[0].id, todoToMove5[0]));
          setDoneTodo(listUpdated5);
          setTodo([...todo, todoToMove5[0]]);
          break;
        case source.droppableId === "done" &&
          destination.droppableId === "inProgress":
          const {
            taskToMove: todoToMove6,
            sourceListUpdated: listUpdated6,
          } = DragDropController({
            sourceList: doneTodo,
            destinationStatus: "inProgress",
            draggableID: draggableId,
          });
          dispatch(UpdateTask(todoToMove6[0].id, todoToMove6[0]));
          setDoneTodo(listUpdated6);
          setInProgress([...inProgress, todoToMove6[0]]);
          break;
      }
    }
    setDragListDetected({ todo: false, inProgress: false, done: false });
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      destination.droppableId === "todo"
    ) {
      setTodo((prevTasks) =>
        reorder(prevTasks, source.index, destination.index)
      );
    } else if (
      source.droppableId === destination.droppableId &&
      destination.droppableId === "inProgress"
    ) {
      setInProgress((prevTasks) =>
        reorder(prevTasks, source.index, destination.index)
      );
    } else if (
      source.droppableId === destination.droppableId &&
      destination.droppableId === "done"
    ) {
      setDoneTodo((prevTasks) =>
        reorder(prevTasks, source.index, destination.index)
      );
    }
  };

  const handleDetectDragging = (result, item) => {
    if (result.destination !== null) {
      if (item === "list") {
        // console.log(result);
        switch (result.destination.droppableId) {
          case "todo":
            setDragListDetected({ todo: true, inProgress: false, done: false });
            return;
          case "inProgress":
            setDragListDetected({ todo: false, inProgress: true, done: false });
            return;
          case "done":
            setDragListDetected({ todo: false, inProgress: false, done: true });
            return;
          default:
            setDragListDetected({
              todo: false,
              inProgress: false,
              done: false,
            });
            return;
        }
      } else {
        // console.log(result);
        // console.log(allTodos.find((task) => task.id === result.draggableId));
        // setDragTaskDetected(result.draggableId);
      }
    }
  };

  const [itemToEdit, setItemToEdit] = useState(!formVisibility && undefined);
  const handleGetEditItem = (item) => {
    setItemToEdit(item);
    setFormVisibility(true);
  };

  return (
    <>
      {loadingVisibility ? (
        <Loading />
      ) : (
        <div className="home">
          <div className="content-options-bar">
            <Button
              size="mediun"
              label="New task"
              onClick={() => handleGetVisibilityFormState(true)}
            />
            <div className="filter-content">
              <label className="filter-label">
                <i className="far fa-calendar-times"></i> Filter:
              </label>
              <div className="filter-options">
                <label
                  className="day-selected"
                  onClick={() => {
                    setFilterVisibility(!filterVisibility);
                    setTimestampSelectorVisibility(false);
                  }}
                >
                  <p className="day-selected-data">{filterDate}</p>
                  <i className="fas fa-chevron-down icon"></i>
                </label>
                {filterVisibility && (
                  <div className="content-options">
                    <li
                      className="option"
                      onClick={() => handleFilterTask("ALL")}
                    >
                      All
                    </li>
                    <li
                      className="option"
                      onClick={() => handleFilterTask("TODAY")}
                    >
                      Today
                    </li>
                    <li
                      className="option"
                      onClick={() =>
                        setTimestampSelectorVisibility(
                          !timestampSelectorVisibility
                        )
                      }
                    >
                      Select day <i className="fas fa-chevron-right icon"></i>
                    </li>
                    {timestampSelectorVisibility && (
                      <div className="timeStamp-input">
                        <Calendar
                          locale="en-EN"
                          onChange={() =>
                            setCalendarDateValue(calendarDateValue)
                          }
                          value={calendarDateValue}
                          onClickDay={(e) => handleFilterTask("CALENDAR", e)}
                        />
                      </div>
                    )}
                    <li className="option-tag">
                      <label className="option-tag-level">Search tag</label>
                      <div className="input-content">
                        <input
                          ref={optionInputRef}
                          className="option-tag-input"
                          type="text"
                          placeholder="Write your tag here"
                        />
                        <i
                          className="fas fa-search icon"
                          onClick={() =>
                            handleFilterTask(
                              "TAG",
                              optionInputRef.current.value
                            )
                          }
                        ></i>
                      </div>
                    </li>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!homeViewState ? (
            <DragDropContext
              onDragEnd={(result) => handleDragEnd(result)}
              onDragUpdate={(result) => handleDetectDragging(result, "list")}
              onDragStart={(result) => handleDetectDragging(result, "task")}
            >
              <Today
                allTodos={alltasksFiltered}
                todo={todo}
                inProgress={inProgress}
                doneTodo={doneTodo}
                dragListDetected={dragListDetected}
                handleDeleteTodoById={handleDeleteTodoById}
                handleGetVisibilityFormState={handleGetVisibilityFormState}
                handleGetEditItem={handleGetEditItem}
              />
            </DragDropContext>
          ) : (
            <div className="timestamp-view">
              <Timestamp
                allTodos={allTodos}
                handleGetEditItem={handleGetEditItem}
                handleDeleteTodoById={handleDeleteTodoById}
              />
            </div>
          )}
          {formVisibility && (
            <FormTodo
              handleGetVisibilityFormState={handleGetVisibilityFormState}
              itemToEdit={itemToEdit}
            />
          )}
        </div>
      )}
    </>
  );
};
