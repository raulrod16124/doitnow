import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";

import { AuthContext } from "../auth/Auth";
import Home from "../modules/Home/views/Home";
import Login from "../modules/Login/views/Login";
import RecoverPassword from "../modules/Login/views/RecoverPassword";
import SignUp from "../modules/Login/views/SingUp";
import { Header } from "../modules/Nav/Header";
import ProtectedRoutes from "./ProtectedRoutes";

function Routes() {
  // User Access
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser && currentUser.accessToken !== undefined) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <Switch>
      <ProtectedRoutes path="/" exact>
        <Redirect to="/home" />
      </ProtectedRoutes>
      <ProtectedRoutes Component="Home" path="/home" exact>
        <Header />
        <Home />
      </ProtectedRoutes>
      <ProtectedRoutes Component="Stats" path="/stats" exact>
        <Header />
        Stats Section
        {/* <Stats /> */}
      </ProtectedRoutes>
      <ProtectedRoutes Component="Profile" path="/profile" exact>
        <Header />
        Profile Section
        {/* <Profile /> */}
      </ProtectedRoutes>
      {/* Start Login Section */}
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/sign-up" exact>
        <SignUp />
      </Route>
      <Route path="/recover-password" exact>
        <RecoverPassword />
      </Route>
    </Switch>
  );
}

export default Routes;
