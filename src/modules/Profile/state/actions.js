import { createUserProfile, getUserProfile, updateProfile } from "../provider";
import { TYPES } from "./type";

export const GetUserProfile = (user) => {
  return async (dispatch) => {
    const userProfile = await getUserProfile(user);
    dispatch({
      type: TYPES.getUserProfile,
      payload: userProfile,
    });
  };
};

export const CreateUserProfile = (user) => {
  return async (dispatch) => {
    const userProfile = await createUserProfile(user);
    dispatch({
      type: TYPES.createUserProfile,
      payload: userProfile,
    });
  };
};

// TODO - refactor to use firebase
export const UpdateUserProfile = (user) => {
  return async (dispatch) => {
    const userUpdatedProfile = await updateProfile(user);
    dispatch({
      type: TYPES.updateUserProfile,
      payload: userUpdatedProfile,
    });
  };
};
