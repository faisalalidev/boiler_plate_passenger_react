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
      return { ...state, isFetching: true };
    case types.DRIVER_COMPLETED_RIDE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      };
    case types.DRIVER_COMPLETED_RIDE.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.message
      };
    case types.RESET_DRIVER_COMPLETED_RIDE:
      return initialState;
    default:
      return state;
  }
};
