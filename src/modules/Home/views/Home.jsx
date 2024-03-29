import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

import { AuthContext } from "../../../auth/Auth";
import { Search } from "../../../stories/Search";
import { Loading } from "../../global/Loading";
import { Header } from "../../Nav/Header";
import { GetTasks, UpdateTask } from "../state/actions";
import { ArchiveTasks } from "./components/ArchiveTasks";
import { DragDropController } from "./components/DragDropController";
import { FormTodo } from "./components/FormTodo";
import { HomeTopBar } from "./components/HomeTopBar";
import { Timestamp } from "./components/Timestamp";
import { Today } from "./components/Today";

export const Home = () => {
  // listenners
  const todosState = useSelector((state) => {
    return state.TodosReducer;
  });

  const viewSelected = useSelector((state) => {
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

  const [dragListDetected, setDragListDetected] = useState({
    todo: false,
    inProgress: false,
    done: false,
  });

  const optionsIconsReponsiveRef = useRef();
  const contentAddAndArchiveFeatureOnResponsiveRef = useRef();
  const [
    optionsIconsReponsiveVisibility,
    setOptionsIconsReponsiveVisibility,
  ] = useState(false);

  const [homeSearchVisibility, setHomeSearchVisibility] = useState(false);

  const [formVisibility, setFormVisibility] = useState(false);

  const handleGetVisibilityFormState = (boolean) => {
    setFormVisibility(boolean);
    setItemToEdit(undefined);
  };

  // const [ dragTaskDetected, setDragTaskDetected] = useState();
  const [todoFilter, setTodoFilter] = useState("All");

  const handleGetTodoFilter = (taskToFilter) => {
    // console.log(taskToFilter);
    setTodoFilter(taskToFilter);
  };

  // User Access
  const userLogged = useContext(AuthContext);

  useEffect(async () => {
    if (userLogged.currentUser) {
      // console.log("first call getTasks");
      dispatch(GetTasks(userLogged.currentUser));
      return <Redirect to="/" />;
    }
  }, [userLogged]);

  useEffect(async () => {
    const userData = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
    );
    if (
      todosState.status === "task_created" ||
      todosState.status === "task_deleted" ||
      todosState.status === "task_updated"
    ) {
      dispatch(GetTasks(userData));
    }
    // // console.log(todosState);
    if (todosState.status === "success" && todoFilter === "All") {
      // console.log("Got it");
      // console.log(todosState);
      handleOrderTaskFiltered(todosState.data);
      setAllTodos(todosState.data);
      setLoadingVisibility(false);
    }
  }, [todosState.status]);

  const handleOrderTaskFiltered = (allTasks) => {
    // console.log(allTasks);
    setTodo(() => allTasks.filter((item) => item.status === "todo"));
    setInProgress(() =>
      allTasks.filter((item) => item.status === "inProgress")
    );
    setDoneTodo(() => allTasks.filter((item) => item.status === "done"));
    setAlltasksFiltered(allTasks);
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
        // // console.log(result);
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
        // // console.log(result);
        // // console.log(allTodos.find((task) => task.id === result.draggableId));
        // setDragTaskDetected(result.draggableId);
      }
    }
  };

  const [itemToEdit, setItemToEdit] = useState(!formVisibility && undefined);
  const handleGetEditItem = (item) => {
    setItemToEdit(item);
    setFormVisibility(true);
  };

  // Archive logic
  const [archiveVisibility, setArchiveVisibility] = useState(false);
  const handleArchiveVisibility = (booleanData) => {
    setArchiveVisibility(booleanData);
  };

  // Search tasks
  const handleSearchArchiveTask = (e) => {
    if (e.target.value === "") {
      handleOrderTaskFiltered(allTodos);
    }
    const searchingArchiveTask = allTodos.filter((task) => {
      if (
        task.title.includes(e.target.value) ||
        task.description.includes(e.target.value)
      ) {
        return task;
      }
    });
    handleOrderTaskFiltered(searchingArchiveTask);
  };

  const handleToggleContentAddAndArchiveFeatureOnResponsiveRef = (
    visibility
  ) => {
    setOptionsIconsReponsiveVisibility(visibility);
    if (visibility === true) {
      contentAddAndArchiveFeatureOnResponsiveRef.current.style.display = "flex";
      setTimeout(() => {
        contentAddAndArchiveFeatureOnResponsiveRef.current.style.width = "40%";
        optionsIconsReponsiveRef.current.style.boxShadow = "none";
      }, 200);
    } else {
      contentAddAndArchiveFeatureOnResponsiveRef.current.style.width = "0%";
      optionsIconsReponsiveRef.current.style.boxShadow =
        "0.2rem 0.2rem 1rem $darkGrey";
      setTimeout(() => {
        if (contentAddAndArchiveFeatureOnResponsiveRef.current !== null) {
          contentAddAndArchiveFeatureOnResponsiveRef.current.style.display =
            "none";
        }
      }, 200);
    }
  };

  const [filterOptionsVisibility, setFilterOptionsVisibility] = useState(false);
  const handleListenClickToCloseFilterOptions = (classname) => {
    const classAvailableClick = [
      "content-options",
      "option",
      "option calendar-selector",
      "fas fa-chevron-right icon",
      "timeStamp-input",
      "option-tag",
      "option-tag-label",
      "input-content",
      "option-tag-input",
      "fas fa-search icon",
      "filter-options",
      "day-selected",
      "day-selected-data",
      "fas fa-chevron-down icon",
    ];
    const filterOptionClass = [
      "filter-options",
      "day-selected",
      "day-selected-data",
      "fas fa-chevron-down icon",
    ];
    if (!classAvailableClick.includes(classname)) {
      setFilterOptionsVisibility(false);
    } else {
      if (filterOptionClass.includes(classname)) {
        setFilterOptionsVisibility(!filterOptionsVisibility);
      } else {
        setFilterOptionsVisibility(true);
      }
    }
  };

  return (
    <>
      {loadingVisibility ? (
        <Loading />
      ) : (
        <div
          className="home"
          onClick={(e) => {
            e.target.className === "bg-archive" && setArchiveVisibility(false);
            handleListenClickToCloseFilterOptions(e.target.className);
            if (
              e.target.className !==
                "content-add-and-archive-feature-on-responsive" &&
              e.target.className !== "fas fa-plus add-icon" &&
              e.target.className !== "fas fa-archive icon archive-icon" &&
              e.target.className !== "fas fa-ellipsis-v icon"
            ) {
              handleToggleContentAddAndArchiveFeatureOnResponsiveRef(false);
            }
            if (
              !e.target.className.includes("search-component") &&
              !e.target.className.includes(
                "icon-search-responsive-from-today"
              ) &&
              !e.target.className.includes("search-today-responsive")
            ) {
              setHomeSearchVisibility(false);
            }
          }}
        >
          <HomeTopBar
            viewSelected={viewSelected}
            allTodos={allTodos}
            filterOptionsVisibility={filterOptionsVisibility}
            setFilterOptionsVisibility={setFilterOptionsVisibility}
            handleGetVisibilityFormState={handleGetVisibilityFormState}
            handleOrderTaskFiltered={handleOrderTaskFiltered}
            handleGetTodoFilter={handleGetTodoFilter}
            handleArchiveVisibility={handleArchiveVisibility}
            handleSearchArchiveTask={handleSearchArchiveTask}
          />
          <div className="content-avatar-header">
            <Header />
          </div>
          {/* Archive section */}
          {archiveVisibility && (
            <ArchiveTasks
              allTodos={allTodos}
              handleArchiveVisibility={handleArchiveVisibility}
            />
          )}
          {/* Home views */}
          {viewSelected.today && (
            <DragDropContext
              onDragEnd={(result) => handleDragEnd(result)}
              onDragUpdate={(result) => handleDetectDragging(result, "list")}
              onDragStart={(result) => handleDetectDragging(result, "task")}
            >
              <i
                className="fas fa-search icon icon-search-responsive-from-today"
                onClick={() => setHomeSearchVisibility(!homeSearchVisibility)}
              ></i>
              {homeSearchVisibility && (
                <div className="search-component">
                  <Search
                    className="search-today-responsive"
                    width="80"
                    height="5"
                    onChange={handleSearchArchiveTask}
                    autoFocus
                  />
                </div>
              )}
              <Today
                allTodos={alltasksFiltered}
                todo={todo}
                inProgress={inProgress}
                doneTodo={doneTodo}
                dragListDetected={dragListDetected}
                handleGetVisibilityFormState={handleGetVisibilityFormState}
                handleGetEditItem={handleGetEditItem}
                handleSearchArchiveTask={handleSearchArchiveTask}
              />
            </DragDropContext>
          )}
          {viewSelected.calendar && (
            <div className="timestamp-view">
              <Timestamp
                allTodos={allTodos}
                handleGetEditItem={handleGetEditItem}
              />
            </div>
          )}
          {formVisibility && (
            <FormTodo
              handleGetVisibilityFormState={handleGetVisibilityFormState}
              itemToEdit={itemToEdit}
            />
          )}
          <div
            className="options-icons-reponsive"
            onClick={() =>
              handleToggleContentAddAndArchiveFeatureOnResponsiveRef(
                !optionsIconsReponsiveVisibility
              )
            }
            ref={optionsIconsReponsiveRef}
          >
            <i className="fas fa-ellipsis-v icon"></i>
          </div>
          <div
            className="content-add-and-archive-feature-on-responsive"
            ref={contentAddAndArchiveFeatureOnResponsiveRef}
          >
            <i
              className="fas fa-plus add-icon"
              onClick={() => {
                handleGetVisibilityFormState(true);
                handleToggleContentAddAndArchiveFeatureOnResponsiveRef();
              }}
            ></i>
            <i
              className="fas fa-archive icon archive-icon"
              onClick={() => {
                handleArchiveVisibility(true);
                handleToggleContentAddAndArchiveFeatureOnResponsiveRef();
              }}
            ></i>
          </div>
        </div>
      )}
    </>
  );
};
