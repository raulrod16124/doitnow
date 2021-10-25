import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";

import auth from "../../../firebase/config";

export const createUser = async (newUser) => {
  console.log("Enter to checkUser");
  console.log(newUser);
  try {
    await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
    console.log(newUser);
    return newUser;
  } catch (error) {
    const errorData = JSON.stringify(error);
    return JSON.parse(errorData).code;
  }
};

export const verifyUser = async (user) => {
  try {
    const userLogged = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    return userLogged;
  } catch (error) {
    const errorData = JSON.stringify(error);
    return JSON.parse(errorData).code;
  }
};

// TODO - Implement Update and Delete User
