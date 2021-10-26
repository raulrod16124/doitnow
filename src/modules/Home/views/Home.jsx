import React, { useContext, useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

import { AuthContext } from "../../../auth/Auth";
import { Footer } from "../../global/Footer";
import { DeleteTask, GetTasks, UpdateTask } from "../state/actions";
import { DragDropController } from "./components/DragDropController";
import List from "./components/List";

// import { Header } from '../global/Header';

function Home() {
  const todosState = useSelector((state) => {
    return state.TodosReducer;
  });

  const dispatch = useDispatch();

  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [doneTodo, setDoneTodo] = useState([]);

  const [allTodos, setAllTodos] = useState([]);

  const [dragListDetected, setDragListDetected] = useState({
    todo: false,
    inProgress: false,
    done: false,
  });

  // const [ dragTaskDetected, setDragTaskDetected] = useState();

  // Class Detect dragging in List
  let classNames = require("classnames");
  let todoDragDetectedClass = classNames("list", {
    dragging: dragListDetected.todo,
  });
  let inProgressDragDetectedClass = classNames("list", {
    dragging: dragListDetected.inProgress,
  });
  let doneDragDetectedClass = classNames("list", {
    dragging: dragListDetected.done,
  });

  // References
  const mainClass = useRef();

  // User Access
  const { currentUser } = useContext(AuthContext);

  useEffect(async () => {
    if (currentUser) {
      dispatch(GetTasks(currentUser.email));
      return <Redirect to="/" />;
    }
  }, [currentUser]);

  useEffect(async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (
      todosState.status === "task created" ||
      todosState.status === "task deleted" ||
      todosState.status === "task updated"
    ) {
      dispatch(GetTasks(userData.email));
    }
    if (todosState.status === "success") {
      console.log(todosState);
      setTodo(() => todosState.data.filter((item) => item.status === "todo"));
      setInProgress(() =>
        todosState.data.filter((item) => item.status === "inProgress")
      );
      setDoneTodo(() =>
        todosState.data.filter((item) => item.status === "done")
      );
      setAllTodos(todosState.data);
    }
  }, [todosState]);

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

  return (
    <>
      <div className="home">
        <DragDropContext
          onDragEnd={(result) => handleDragEnd(result)}
          onDragUpdate={(result) => handleDetectDragging(result, "list")}
          onDragStart={(result) => handleDetectDragging(result, "task")}
        >
          <div className="main" ref={mainClass}>
            <div className="progress-bar">
              <div className="level-bar">
                <div
                  className="green-fill"
                  style={{
                    width:
                      allTodos.length > 0
                        ? (doneTodo.length / allTodos.length) * 100 + "%"
                        : 0 + "%",
                  }}
                ></div>
              </div>
            </div>
            <div className="content-body">
              <div className="content-lists">
                <List
                  key="todo"
                  droppableID="todo"
                  list={todo}
                  className={todoDragDetectedClass}
                  titleList="TO DO"
                  handleDeleteTodoById={handleDeleteTodoById}
                />
                <List
                  key="inProgress"
                  droppableID="inProgress"
                  list={inProgress}
                  className={inProgressDragDetectedClass}
                  titleList="IN PROGRESS"
                  handleDeleteTodoById={handleDeleteTodoById}
                />
                <List
                  key="doneTodo"
                  droppableID="done"
                  list={doneTodo}
                  className={doneDragDetectedClass}
                  titleList="COMPLETED"
                  handleDeleteTodoById={handleDeleteTodoById}
                />
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

export default Home;
