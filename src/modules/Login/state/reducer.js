import { TYPES } from "./type";

const initialState = {
  status: "initial",
  error: "",
  data: {},
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.checkUser:
      let userData = null;
      // // console.log(action.payload);
      if (action.payload.user?.stsTokenManager.refreshToken) {
        userData = {
          id: action.payload._tokenResponse.localId,
          token: action.payload._tokenResponse.idToken,
          email: action.payload.user.providerData[0].email,
          name: action.payload.user.providerData[0].email.split("@")[0],
        };
      }
      if (userData?.token) {
        return {
          ...state,
          data: userData,
          status: "success",
        };
      } else {
        return {
          ...state,
          error: action.payload.split("/")[1].replace("-", " "),
          status: "error",
        };
      }

    case TYPES.createNewUser:
      // console.log(action.payload);
      if (action.payload.email) {
        return {
          ...state,
          data: action.payload,
          status: "created_account",
        };
      } else {
        return {
          ...state,
          error: action.payload.split("/")[1].replace("-", " "),
          status: "error",
        };
      }
    // TODO - Refactor to use firebase
    case TYPES.updateUser:
    // // console.log(action.payload);
    // const updateTodo = state.map( todo => {
    //     if( todo.id === action.payload.id ){
    //         return todo = action.payload;
    //     };
    //     return todo;
    // } );
    // return updateTodo;
    case TYPES.deleteUser:
    // // console.log(action.payload);
    // const updateTodos = state.filter( todo => todo.id !== action.payload );
    // return updateTodos;

    default:
      return state;
  }
};
