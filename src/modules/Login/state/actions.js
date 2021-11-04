import { CreateUserProfile, GetUserProfile } from "../../Profile/state/actions";
import { createUser, verifyUser } from "../provides";
import { TYPES } from "./type";

export const CheckUser = (user) => {
  return async (dispatch) => {
    const userData = await verifyUser(user);
    if (userData._tokenResponse) {
      console.log("Token exists");
      dispatch(GetUserProfile(userData._tokenResponse));
    }
    dispatch({
      type: TYPES.checkUser,
      payload: userData,
    });
  };
};

export const CreateUser = (user) => {
  return async (dispatch) => {
    const { userTokenCreated, newUser } = await createUser(user);
    if (userTokenCreated) {
      console.log("Token Created");
      const userProfile = {
        id: userTokenCreated.localId,
        name: user.email.split("@")[0],
        email: user.email,
        avatar: "./../../assets/avatars/girl1.png",
      };
      dispatch(CreateUserProfile(userProfile));
    }
    console.log("Second Dispatch");
    dispatch({
      type: TYPES.createNewUser,
      payload: newUser,
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
