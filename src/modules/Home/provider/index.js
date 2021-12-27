import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "@firebase/firestore";

import { db } from "../../../firebase/config";

export const getAllTasks = async (user) => {
  const idToFilter = user.uid ? user.uid : user.id;
  // console.log("Enter to getAllTasks by user");
  try {
    const tasksCall = collection(db, "todos");
    const tasksSnapshot = await getDocs(tasksCall);
    const tasksList = tasksSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    // console.log(user);
    const taskByUser = tasksList.filter((task) => task.owner === idToFilter);
    console.log(taskByUser);

    // TODO - Fix permissions to get the info from the db in firebase
    // https://firebase.google.com/docs/firestore/solutions/role-based-access
    // TODO - Filter by user before return

    return taskByUser;
  } catch (error) {
    // const errorData = JSON.stringify(error);
    // return JSON.parse(errorData).code;
    // console.log(Object.values(error));
    return error;
  }
};

export const createNewTask = async (newTask) => {
  // console.log("Enter to createNewTask");
  // console.log(newTask);
  try {
    const tasksCall = collection(db, "todos");
    // console.log(tasksCall);
    // const taskCreated = await addDoc(tasksCall, newTask);
    // // console.log(taskCreated);
    return await addDoc(tasksCall, newTask);
  } catch (error) {
    // const errorData = JSON.stringify(error);
    // return JSON.parse(errorData).code;
    // console.log(Object.values(error)[0]);
    return error;
  }
};

export const updateTask = async (idToUpdate, data) => {
  // console.log("Enter to updateTask");
  // console.log(idToUpdate);
  // console.log(data);
  try {
    const docRefToUpdate = doc(db, "todos", idToUpdate);
    await setDoc(docRefToUpdate, data);
    const taskUpdated = await getDoc(docRefToUpdate);
    return taskUpdated;
  } catch (error) {
    // const errorData = JSON.stringify(error);
    // return JSON.parse(errorData).code;
    // console.log(error);
    return error;
  }
};

export const deleteTask = async (idTaskToDelete) => {
  // console.log("Enter to deleteTask");
  // // console.log(idTaskToDelete);
  try {
    const docRefToDelete = doc(db, "todos", idTaskToDelete);
    return await deleteDoc(docRefToDelete);

    // TODO - Refresh the all tasks in the interface correclty

    // const taskDeleted = await getDoc(idTaskToDelete);
    // // console.log(taskDeleted);
    // return taskDeleted;
  } catch (error) {
    // const errorData = JSON.stringify(error);
    // return JSON.parse(errorData).code;
    // console.log(error);
    return error;
  }
};
