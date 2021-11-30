import { TYPES } from "./type";

const initialState = {
  status: "initial",
  error: "",
  data: [],
};

export const TodosReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.getTasks:
      // console.log(action.payload);
      // console.log(action.payload.length);
      if (action.payload.length > 0) {
        return {
          ...state,
          data: action.payload,
          status: "success",
        };
      } else {
        return {
          ...state,
          error: action.payload,
          status: "error",
        };
      }
    case TYPES.createTask:
      if (action.payload) {
        return {
          ...state,
          status: "task_created",
        };
      } else {
        return {
          ...state,
          error: action.payload,
          status: "error",
        };
      }
    case TYPES.updateTask:
      // // console.log(action.payload);
      if (action.payload) {
        return {
          ...state,
          status: "task_updated",
        };
      } else {
        return {
          ...state,
          error: action.payload,
          status: "error",
        };
      }
    case TYPES.deleteTask:
      if (action.payload) {
        return {
          ...state,
          status: "task_deleted",
        };
      } else {
        return {
          ...state,
          error: action.payload,
          status: "error",
        };
      }

    default:
      return state;
  }
};
