import React from "react";
import { Provider } from "react-redux";
import { Home } from "./Home/Home";
import store from '../store/store';

import './styles/main.scss';

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home/>
      </div>
    </Provider>
  );
}
