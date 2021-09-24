import './styles/main.scss';

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from '../routes';
import store from '../store/store';

export default function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes />
        </Router>
      </div>
    </Provider>
  );
}
