import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const persistConfig = {
  key: "root",
  storage: storage,
};

const middleware = [thunk];
const middleWareEnhancer = applyMiddleware(...middleware);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeWithDevTools({
  trace: true,
});

const store = createStore(
  persistedReducer,
  initialState,
  composedEnhancers(middleWareEnhancer)
);

export default store;
