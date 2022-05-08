// @flow
import * as types from "../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {}
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.DELETE_STRIPE.REQUEST:
      return {state, 
        isFetching: true
      };
    case types.DELETE_STRIPE.SUCCESS:
      return {state, 
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      };
    case types.DELETE_STRIPE.FAILURE:
      return {state, 
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};
