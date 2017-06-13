import { combineReducers } from "redux";
import * as markersReducer from "./markers";
import * as userReducers from "./user";

export default combineReducers(Object.assign(markersReducer, userReducers));
