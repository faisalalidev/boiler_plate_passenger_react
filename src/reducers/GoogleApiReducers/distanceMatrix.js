// @flow
import Immutable from "seamless-immutable";
import * as types from "../../actions/ActionTypes";
const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.DISTANCE_MATRIX.REQUEST:
      return { ...state, isFetching: true };
    case types.DISTANCE_MATRIX.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data.rows[0].elements[0]
      };
    case types.DISTANCE_MATRIX.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};
