import * as MarkerActions from "./marker";
import * as TripActions from "./trip";
import * as AuthActions from "./auth";

export const ActionCreators = Object.assign({}, MarkerActions, TripActions, AuthActions);
