class LoginProvider{
    // constructor() {}
    
    //CHECK
    checkUser(user) {
        /* Call User API to check the user information */
        console.log("checkingUser")
        user.data = {
            id: 1,
            name: "DoneBoy",
            JWTK: "HVC55863DTZ",
        }
        return user;
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
  
  export default new LoginProvider();