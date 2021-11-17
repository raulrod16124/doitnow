import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { AsideReducer } from "../modules/Aside/state/reducer";
import { ConfirmationPropmtReducer } from "../modules/global/ConfirmationPropmt/state/reducer";
import { TodosReducer } from "../modules/Home/state/reducer";
import { LoginReducer } from "../modules/Login/state/reducer";
import { ProfileReducer } from "../modules/Profile/state/reducer";

const reducers = combineReducers({
  TodosReducer: TodosReducer,
  LoginReducer: LoginReducer,
  AsideReducer: AsideReducer,
  ProfileReducer: ProfileReducer,
  ConfirmationPropmtReducer: ConfirmationPropmtReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
