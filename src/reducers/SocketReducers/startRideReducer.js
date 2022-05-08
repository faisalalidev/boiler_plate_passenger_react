// @flow

import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {},
  startTripStatus: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.DRIVER_STARTED_RIDE.REQUEST:
      return { ...state, isFetching: true, startTripStatus: false };
    case types.DRIVER_STARTED_RIDE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data,
        startTripStatus: true
      };
    case types.DRIVER_STARTED_RIDE.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.message,
        startTripStatus: false
      };
    case types.RESET_DRIVER_STARTED_RIDE:
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
