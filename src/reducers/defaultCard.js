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
    case types.DEFAULT_CARD.REQUEST:
      return {state, 
        isFetching: true
      };
    case types.DEFAULT_CARD.SUCCESS:
      return {state, 
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      };
    case types.DEFAULT_CARD.FAILURE:
      return {state, 
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};
