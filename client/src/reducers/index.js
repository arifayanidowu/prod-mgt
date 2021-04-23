import { combineReducers } from "redux";
import { RESET_STORE } from "../types/resetStoreType";
import authReducer from "./authReducer";
import commentReducer from "./commentReducer";
import productReducer from "./productReducer";

const appReducer = combineReducers({
  auth: authReducer,
  comment: commentReducer,
  product: productReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
