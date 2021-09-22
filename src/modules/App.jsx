import './styles/main.scss';

import React from "react";
import { Provider } from "react-redux";

import store from '../store/store';
import { Home } from "./Home/views/Home";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home/>
      </div>
    </Provider>
  );
}
