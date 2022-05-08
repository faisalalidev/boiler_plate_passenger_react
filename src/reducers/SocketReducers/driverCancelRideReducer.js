// @flow

import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {},
  driverCancelRideStatus: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.DRIVER_CANCELED_RIDE.REQUEST:
      return { ...state, isFetching: true, driverCancelRideStatus: false };
    case types.DRIVER_CANCELED_RIDE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data,
        driverCancelRideStatus: true
      };
    case types.DRIVER_CANCELED_RIDE.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.message,
        driverCancelRideStatus: false
      };
    case types.RESET_DRIVER_CANCELED_RIDE:
      return initialState;
    default:
      return state;
  }
};
