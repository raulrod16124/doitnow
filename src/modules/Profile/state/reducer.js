import { TYPES } from "./type";

const initialState = {
  status: "initial",
  error: "",
  data: [],
};

export const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.getUserProfile:
      if (action.payload) {
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
    case TYPES.createUserProfile:
      console.log(action.payload);
      if (action.payload.length > 0) {
        return {
          ...state,
          data: action.payload,
          status: "created profile success",
        };
      } else {
        return {
          ...state,
          error: action.payload,
          status: "error",
        };
      }
    case TYPES.updateUserProfile:
      console.log(action.payload._document.data.value.mapValue.fields);
      if (action.payload) {
        return {
          ...state,
          status: "userData_updated",
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
