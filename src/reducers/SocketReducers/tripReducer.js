// @flow
import Immutable from "seamless-immutable";
import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {}
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.DRIVER_COMPLETED_RIDE.REQUEST:
    case types.DRIVER_STARTED_RIDE.REQUEST:
    case types.REQUEST_RIDE.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.DRIVER_COMPLETED_RIDE.SUCCESS:
    case types.REQUEST_RIDE.SUCCESS:
    case types.DRIVER_STARTED_RIDE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      };
    case types.DRIVER_COMPLETED_RIDE.FAILURE:
    case types.DRIVER_STARTED_RIDE.FAILURE:
    case types.REQUEST_RIDE.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    case types.RESET_DRIVER_COMPLETED_RIDE:
    case types.RESET_DRIVER_STARTED_RIDE:
    case types.REQUEST_RIDE_RESET:
    case types.LOGOUT:
      return { initialState };
    case types.REQUEST_RIDE_CONDITIONAL_RESET:
      return { ...state, failure: false };
    default:
      return state;
  }
};
