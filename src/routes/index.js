import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";

import { AuthContext } from "../auth/Auth";
import { Home } from "../modules/Home/views/Home";
import Login from "../modules/Login/views/Login";
import RecoverPassword from "../modules/Login/views/RecoverPassword";
import SignUp from "../modules/Login/views/SingUp";
import { Header } from "../modules/Nav/Header";
import { Profile } from "../modules/Profile/views/Profile";
import ProtectedRoutes from "./ProtectedRoutes";

function Routes() {
  const history = useHistory();

  // Routes
  const existingRoutes = ["/home", "/stats", "/profile"];

  // User Access
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser && currentUser.accessToken !== undefined) {
      const userData = {
        id: currentUser.uid,
        name: currentUser.email.split("@")[0],
        email: currentUser.email,
        avatar: "",
      };
      console.log(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [currentUser]);

  useEffect(() => {
    const routesCondition = existingRoutes.some(
      (route) => route === history.location.pathname
    );
    console.log(routesCondition);
    if (JSON.parse(localStorage.getItem("user"))) {
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
        <Profile />
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
