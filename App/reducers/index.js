import { combineReducers } from "redux";
import * as markersReducer from "./marker";
import * as userReducers from "./user";
import * as authReducers from "./auth";

export default combineReducers(
  Object.assign(authReducers, markersReducer, userReducers)
);
