// @flow
import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PASSENGER_RECENT_LOCATION.REQUEST:
      return { ...state, isFetching: true };
    case types.GET_PASSENGER_RECENT_LOCATION.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      };
    case types.GET_PASSENGER_RECENT_LOCATION.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
