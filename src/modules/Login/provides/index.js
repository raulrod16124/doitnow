import axios from "axios";
import React from "react";

export default class LoginProvider extends React.Component{
  url = process.env.REACT_APP_SERVER_URL;
  
  constructor(props) {
    super(props);
  }
  
  //CHECK
  async checkUser(user) {
    console.log("Enter to checkUser")
      /* Call User API to check the user information */
      return await axios.post("http://localhost:5500/login", user)
            .then(response => {
              console.log("Then")
              console.log(response.data);
              return response.data;
            }).catch(error => {
              console.log("catch")
              // console.log(error)
              return error;
            });
            
      // console.log("checkingUser")
      // user.data = {
      //     id: 1,
      //     name: "DoneBoy",
      //     JWTK: "HVC55863DTZ",
      // }
      // return user;
  };

    
    
    //CREATE
    create(newUser) {
        return LoginProvider.mockCreate(newUser);
    }
  
    static mockCreate(newUser) {
      // Mock New user creation
      // And reception from the backend
      const userCreated = {
        id: Math.round( Math.random() * ( 9999 - 1000 ) + 1 ),
        name: newUser.name,
        JWTK: `${newUser.name}${newUser.lastName}`,
      }
      
      return userCreated;
    }
  
    //UPDATE
    update(updateUser) {
        return LoginProvider.mockUpdate(updateUser);
    }
    static mockUpdate(updateUser) {
      return updateUser;
    }
  
  
    //DELETE
  //   delete(UserToDelete) {
  //       return LoginProvider.mockDelete(UserToDelete);
  //   
  //   }
  //   static mockDelete(UserToDelete) {
  //     return UserToDelete;
  //   }
}