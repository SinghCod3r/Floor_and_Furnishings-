import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { loadState } from "../Utility/LocalStorage";
// import reducer from "./Reducers/reducer";
import Reducer from "./Reducers/Reducer";

const persistedState = loadState();
const rootReducer = {
  user: Reducer,
};
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export default store;
