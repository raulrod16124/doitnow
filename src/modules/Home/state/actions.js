import {
  createNewTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../provider";
import { TYPES } from "./type";

export const GetTasks = (user) => {
  console.log(user);
  return async (dispatch) => {
    const userTasks = await getAllTasks(user);
    // console.log(userTasks);
    dispatch({
      type: TYPES.getTasks,
      payload: userTasks,
    });
  };
};
export const CreateTask = (task) => {
  return async (dispatch) => {
    const newTask = await createNewTask(task);
    console.log(newTask);
    dispatch({
      type: TYPES.createTask,
      payload: newTask,
    });
  };
};
export const UpdateTask = (idTaskToDelete, data) => {
  return async (dispatch) => {
    const taskUpdated = await updateTask(idTaskToDelete, data);
    dispatch({
      type: TYPES.updateTask,
      payload: taskUpdated,
    });
  };
};

export const DeleteTask = (idTaskToDelete) => {
  return async (dispatch) => {
    const taskDeleted = await deleteTask(idTaskToDelete);
    console.log(taskDeleted);
    dispatch({
      type: TYPES.deleteTask,
      payload: idTaskToDelete,
    });
  };
};
