import { createUser, verifyUser } from "../provides";
import { TYPES } from "./type";

export const CheckUser = (user) => {
  return async (dispatch) => {
    const userData = await verifyUser(user);
    dispatch({
      type: TYPES.checkUser,
      payload: userData,
    });
  };
};

export const CreateUser = (user) => {
  return async (dispatch) => {
    const userData = await createUser(user);

    dispatch({
      type: TYPES.createNewUser,
      payload: userData,
    });
  };
};

// TODO - refactor to use firebase
export const UpdateUser = (user) => {
  return {
    type: TYPES.updateUser,
    payload: user,
  };
};
export const DeleteUser = (user) => {
  return {
    type: TYPES.deleteUser,
    payload: user,
  };
};
