import { CreateTask } from "../../Home/state/actions";
import { CreateUserProfile, GetUserProfile } from "../../Profile/state/actions";
import { avatars } from "../../Profile/views/components/avatars";
import { createUser, verifyUser } from "../provides";
import { TYPES } from "./type";

export const CheckUser = (user) => {
  return async (dispatch) => {
    const userData = await verifyUser(user);
    // if (userData._tokenResponse) {
    //   // console.log("Token exists");
    //   dispatch(GetUserProfile(userData._tokenResponse));
    // }
    dispatch({
      type: TYPES.checkUser,
      payload: userData,
    });
  };
};

export const CreateUser = (user) => {
  return async (dispatch) => {
    const { userTokenCreated, newUser } = await createUser(user);
    // console.log("Token Created");
    // console.log(userTokenCreated);
    if (userTokenCreated) {
      const userProfile = {
        id: userTokenCreated.localId,
        name: user.email.split("@")[0],
        email: user.email,
        avatar: avatars.lion,
        level: "1",
        experience: 0,
      };
      dispatch(CreateUserProfile(userProfile));
      // Move the newTask structure to a model doc.
      dispatch(
        CreateTask({
          title: "Hey, I'm your first task",
          level: "easy",
          status: "todo",
          description:
            "Drag me up to the IN PROGRESS column to work with me, and to the COMPLETED column to finish this task 😊",
          date: new Date().toLocaleDateString(),
          tags: [
            {
              color: "#4caf50",
              tag: "Initial task",
            },
            {
              color: "#009688",
              tag: "Move me",
            },
          ],
          owner: userTokenCreated.localId,
        })
      );
    }
    // console.log("Second Dispatch");
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
