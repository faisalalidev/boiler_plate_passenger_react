// @flow

import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {},
  rideRatingStatus: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.RIDE_RATING.REQUEST:
      return { ...state, isFetching: true, rideRatingStatus: false };
    case types.RIDE_RATING.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data,
        rideRatingStatus: true
      };
    case types.RIDE_RATING.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.message,
        rideRatingStatus: false
      };
    case types.LOGOUT:
      return { initialState };
    default:
      return state;
  }
};
