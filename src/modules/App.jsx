import "./styles/main.scss";

import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "../auth/Auth";
import Routes from "../routes";
import store from "../store/store";
import { AsideNav } from "./Aside/views/AsideNav";
import { ArchiveTasks } from "./Aside/views/components/ArchiveTasks";

export default function App() {
  const [archiveVisibility, setArchiveVisibility] = useState(false);
  const handleArchiveVisibility = (booleanData) => {
    setArchiveVisibility(booleanData);
  };
  return (
    <Provider store={store}>
      <div
        className="App"
        onClick={(e) =>
          e.target.className === "bg-archive" && setArchiveVisibility(false)
        }
      >
        <AuthProvider>
          <Router>
            <AsideNav handleArchiveVisibility={handleArchiveVisibility} />
            <Routes />
            {archiveVisibility && (
              <ArchiveTasks handleArchiveVisibility={handleArchiveVisibility} />
            )}
          </Router>
        </AuthProvider>
      </div>
    </Provider>
  );
}
