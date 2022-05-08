// @flow
import Immutable from "seamless-immutable";
import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: []
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.VEHICLE_CATEGORY.REQUEST:
      return { ...state, isFetching: true };
    case types.VEHICLE_CATEGORY.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data.map((item, index) =>
          index === 0
            ? { ...item, isActive: true }
            : { ...item, isActive: false }
        )
      };
    case types.VEHICLE_CATEGORY.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.message
      };
    case types.VEHICLE_CATEGORY_SELECTED:
      return {
        ...state,
        data: state.data.map((item, index) =>
          index === action.payload
            ? { ...item, isActive: true }
            : { ...item, isActive: false }
        )
      };
    default:
      return state;
  }
};
