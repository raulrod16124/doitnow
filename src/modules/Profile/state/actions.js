import { createUserProfile, getUserProfile, updateProfile } from "../provider";
import { TYPES } from "./type";

export const GetUserProfile = (user) => {
  // console.log(user);
  return async (dispatch) => {
    const userProfileData = await getUserProfile(user);
    const userProfile = {
      id: Object.values(
        userProfileData._document.data.value.mapValue.fields.id
      )[0],
      name: Object.values(
        userProfileData._document.data.value.mapValue.fields.name
      )[0],
      email: Object.values(
        userProfileData._document.data.value.mapValue.fields.email
      )[0],
      avatar: Object.values(
        userProfileData._document.data.value.mapValue.fields.avatar
      )[0],
      level: Object.values(
        userProfileData._document.data.value.mapValue.fields.level
      )[0],
      experience: Object.values(
        userProfileData._document.data.value.mapValue.fields.experience
      )[0],
    };
    // console.log(userProfile);
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
export const UpdateUserProfile = (idUser, user) => {
  return async (dispatch) => {
    const userUpdatedProfile = await updateProfile(idUser, user);
    dispatch({
      type: TYPES.updateUserProfile,
      payload: userUpdatedProfile,
    });
  };
};
