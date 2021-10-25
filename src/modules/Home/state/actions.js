import { createNewTask, deleteTask, getAllTasks } from "../provider";
import { TYPES } from "./type";

export const GetTasks = (user) => {
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
    // console.log(newTask);
    dispatch({
      type: TYPES.createTask,
      payload: newTask,
    });
  };
};
export const UpdateTask = (task) => {
  return {
    type: TYPES.updateTask,
    payload: task,
  };
};

export const DeleteTask = (idTaskToDelete) => {
  return async (dispatch) => {
    await deleteTask(idTaskToDelete);
    dispatch({
      type: TYPES.deleteTask,
      payload: idTaskToDelete,
    });
  };
};
