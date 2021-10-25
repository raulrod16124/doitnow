import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { TodosReducer } from "../modules/Home/state/reducer";
import { LoginReducer } from "../modules/Login/state/reducer";

const reducers = combineReducers({
  TodosReducer: TodosReducer,
  LoginReducer: LoginReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
