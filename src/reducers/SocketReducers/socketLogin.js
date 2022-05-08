// @flow

import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {}
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.SOCKET_LOGIN.REQUEST:
      return { ...state, isFetching: true };
    case types.SOCKET_LOGIN.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      };
    case types.SOCKET_LOGIN.FAILURE:
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
