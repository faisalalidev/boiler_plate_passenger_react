// @flow
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = {
  showHomeViews: true,
  showAutoCompleteViews: false,
  showRideSearchDetailViews: false,
  showRideSearchingViews: false,
  showRequestRideViews: false,
  showStartRideViews: false,
  showCompleteRideViews: false,
  showRideRatingContentViews: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.SHOW_HOME_VIEWS:
      return { ...state, ...initialState, showHomeViews: action.payload };
    case types.SHOW_AUTOCOMPLETE_VIEWS:
      return {
        ...state,
        ...initialState,
        showHomeViews: false,
        showAutoCompleteViews: action.payload
      };
    case types.SHOW_RIDE_SEARCH_DETAIL_VIEWS:
      return {
        ...state,
        ...initialState,
        showHomeViews: false,
        showRideSearchDetailViews: action.payload
      };
    case types.SHOW_RIDE_SEARCHING_VIEWS:
      return {
        ...state,
        ...initialState,
        showHomeViews: false,
        showRideSearchingViews: action.payload
      };
    case types.SHOW_IN_RIDE_VIEWS:
      return { ...state, ...initialState, showInRideViews: action.payload };
    case types.SHOW_COMPLETE_RIDE_VIEWS:
      return {
        ...state,
        ...initialState,
        showHomeViews: false,
        showInRideViews: action.payload
      };
    case types.SHOW_RIDE_RATING_CONTENT_VIEWS:
      return {
        ...state,
        ...initialState,
        showHomeViews: false,
        showRideRatingContentViews: action.payload
      };
    case types.DRIVER_COMPLETED_RIDE.SUCCESS:
      return {
        ...state,
        ...initialState,
        showHomeViews: false,
        showCompleteRideViews: true
      };
    case types.REQUEST_RIDE.SUCCESS:
      return {
        ...state,
        ...initialState,
        showHomeViews: false,
        showRequestRideViews: true
      };
    case types.DRIVER_STARTED_RIDE.SUCCESS:
      return {
        ...state,
        ...initialState,
        showHomeViews: false,
        showStartRideViews: true
      };
    case types.LOGOUT:
      return { initialState };
    default:
      return state;
  }
};
