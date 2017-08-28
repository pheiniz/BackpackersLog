import createReducer from "./createReducer";
import * as types from "../actions/types";

const initialState = {
    trips: [],
    activeTrip: null
};

export const tripState = createReducer(initialState, {
    [types.ADD_TRIPS](state = initialState, action) {
        return Object.assign({}, state, {trips: action.payload});
    },
    [types.CHANGE_ACTIVE_TRIP](state = initialState, action) {
        return Object.assign({}, state, {activeTrip: action.payload});
    }
});
