import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "@firebase/firestore";

import { db } from "../../../firebase/config";

export const getUserProfile = async (user) => {
  console.log("Enter to getUserProfile");
  try {
    const userProfileCall = collection(db, "users");
    const userProfileSnapshot = await getDocs(userProfileCall);
    // console.log(tasksSnapshot);
    const userProfile = userProfileSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const userProfileById = userProfile.filter((userProfile) => {
      if (userProfile.uid === user) {
        return userProfile;
      }
    });

    // TODO - Fix permissions to get the info from the db in firebase
    // https://firebase.google.com/docs/firestore/solutions/role-based-access
    // TODO - Filter by user before return

    return userProfileById;
  } catch (error) {
    // const errorData = JSON.stringify(error);
    // return JSON.parse(errorData).code;
    console.log(error);
    return error;
  }
};

export const createUserProfile = async (userData) => {
  console.log("Enter to createUserProfile");
  try {
    const userProfileCall = collection(db, "users");
    await addDoc(userProfileCall, userData);
    return userData;
  } catch (error) {
    // const errorData = JSON.stringify(error);
    // return JSON.parse(errorData).code;
    console.log(error);
    return error;
  }
};

export const updateProfile = async (idToUpdate, data) => {
  console.log("Enter to updateProfile");
  console.log(idToUpdate);
  console.log(data);
  try {
    const docRefToUpdate = doc(db, "users", idToUpdate);
    await setDoc(docRefToUpdate, data);
    const userProfileUpdated = await getDoc(docRefToUpdate);
    return userProfileUpdated;
  } catch (error) {
    // const errorData = JSON.stringify(error);
    // return JSON.parse(errorData).code;
    console.log(error);
    return error;
  }
};
