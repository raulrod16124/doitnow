import { combineReducers, createStore } from "redux";

import { TodosReducer } from "../modules/Home/state/reducer";

const reducers = combineReducers({
    TodosReducer:TodosReducer
})

const store = createStore(reducers);

export default store;