import "./styles/main.scss";

import React from "react";
import { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "../auth/Auth";
import Routes from "../routes";
import store from "../store/store";
import { AsideNav } from "./Aside/views/AsideNav";
import { ExperiencePoints } from "./ExperiencePoints/ExperiencePoints";
import { ConfirmationPrompt } from "./global/ConfirmationPrompt/ConfirmationPrompt";

export default function App() {
  const [navVisibility, setNavVisibility] = useState(false);

  return (
    <Provider store={store}>
      <div className="App">
        <AuthProvider>
          <ExperiencePoints />
          <Router>
            <div className="main">
              {navVisibility && <AsideNav />}
              <Routes setNavVisibility={setNavVisibility} />
            </div>
          </Router>
        </AuthProvider>
      </div>
      <ConfirmationPrompt />
    </Provider>
  );
}
