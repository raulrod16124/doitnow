import "./styles/main.scss";

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "../auth/Auth";
import Routes from "../routes";
import store from "../store/store";
import { FormTodo } from "./Aside/views/FormTodo";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AuthProvider>
          <Router>
            <FormTodo />
            <Routes />
          </Router>
        </AuthProvider>
      </div>
    </Provider>
  );
}
