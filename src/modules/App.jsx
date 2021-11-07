import "./styles/main.scss";

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "../auth/Auth";
import Routes from "../routes";
import store from "../store/store";
import { AsideNav } from "./Aside/views/AsideNav";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AuthProvider>
          <Router>
            <AsideNav />
            <Routes />
          </Router>
        </AuthProvider>
      </div>
    </Provider>
  );
}
