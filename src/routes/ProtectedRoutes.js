import React, { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

import { AuthContext } from "../auth/Auth";

function ProtectedRoutes({ Component, ...restOfProps }) {
  const history = useHistory();

  // User Access
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (
      !JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY))
    ) {
      history.push({ pathname: "/login" });
    }
  }, [currentUser]);

  return (
    <Route
      {...restOfProps}
      render={(props) => currentUser.accessToken && <Component {...props} />}
    />
  );
}

export default ProtectedRoutes;
