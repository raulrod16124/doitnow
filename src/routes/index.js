import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";

import { AuthContext } from "../auth/Auth";
import { Home } from "../modules/Home/views/Home";
import Login from "../modules/Login/views/Login";
import RecoverPassword from "../modules/Login/views/RecoverPassword";
import SignUp from "../modules/Login/views/SingUp";
import { Profile } from "../modules/Profile/views/Profile";
import ProtectedRoutes from "./ProtectedRoutes";

function Routes({ setNavVisibility }) {
  const history = useHistory();

  // Routes
  const existingRoutes = ["/home", "/profile"];

  // User Access
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser && currentUser.accessToken !== undefined) {
      // console.log("user authenticated");
      const userData = {
        id: currentUser.uid,
        name: currentUser.email.split("@")[0],
        email: currentUser.email,
        avatar: "",
      };
      localStorage.setItem(
        process.env.REACT_APP_LOCAL_STORAGE_KEY,
        JSON.stringify(userData)
      );
      setNavVisibility(true);
    } else {
      setNavVisibility(false);
    }
  }, [currentUser]);

  useEffect(() => {
    const routesCondition = existingRoutes.some(
      (route) => route === history.location.pathname
    );
    // console.log(routesCondition);
    if (
      JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY))
    ) {
      if (!routesCondition) {
        history.push({ pathname: "/home" });
      }
    } else {
      history.push({ pathname: "/login" });
    }
  }, []);

  return (
    <Switch>
      <ProtectedRoutes path="/" exact>
        <Redirect to="/home" />
      </ProtectedRoutes>
      <ProtectedRoutes Component="Home" path="/home" exact>
        <Home />
      </ProtectedRoutes>
      <ProtectedRoutes Component="Profile" path="/profile" exact>
        <Profile />
      </ProtectedRoutes>
      {/* <ProtectedRoutes Component="Stats" path="/stats" exact>
        Stats Section
        <Stats />
      </ProtectedRoutes> */}
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
