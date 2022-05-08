// @flow
import * as types from "../../actions/ActionTypes";
import { AnimatedRegion } from "react-native-maps";
const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NEARBY_ALL_DRIVER.REQUEST:
      return { ...state, isFetching: true };
    case types.NEARBY_ALL_DRIVER.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      };
    case types.NEARBY_ALL_DRIVER.FAILURE:
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
