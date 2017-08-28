import {combineReducers} from "redux";
import * as markersReducer from "./marker";
import * as tripReducer from "./trip";
import * as userReducers from "./user";
import * as authReducers from "./auth";

export default combineReducers(Object.assign(authReducers, markersReducer, tripReducer, userReducers));
