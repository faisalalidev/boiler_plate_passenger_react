// @flow
import Immutable from "seamless-immutable";
import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {},
  requestRideSuccess: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.REQUEST_RIDE.REQUEST:
      return {
        ...state,
        isFetching: true,
        requestRideSuccess: false
      };
    case types.REQUEST_RIDE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data,
        requestRideSuccess: true
      };
    case types.REQUEST_RIDE.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage,
        requestRideSuccess: false
      };
    case types.REQUEST_RIDE_RESET:
    case types.LOGOUT:
      return { initialState };
    case types.REQUEST_RIDE_CONDITIONAL_RESET:
      return { ...state, failure: false, requestRideSuccess: false };
    default:
      return state;
  }
};
