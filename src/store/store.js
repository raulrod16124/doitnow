import { combineReducers, createStore } from "redux";

import { TodosReducer } from "../modules/Home/state/reducer";
import { LoginReducer } from "../modules/Login/state/reducer";

const reducers = combineReducers({
    TodosReducer:TodosReducer,
    LoginReducer: LoginReducer
})

const store = createStore(reducers);

export default store;