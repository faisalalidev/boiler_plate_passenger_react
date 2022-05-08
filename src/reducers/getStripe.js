// @flow

import * as types from "../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: []
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.GET_STRIPE.REQUEST:
      return { ...state, isFetching: true };
    case types.GET_STRIPE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      };
    case types.GET_STRIPE.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    case types.GET_STRIPE_LIST_UPDATE:
      return {
        ...state,
        data: state.data.concat(action.data)
      }
    case types.GET_STRIPE_LIST_REMOVE:
      return {
        ...state,
        data: state.data.filter(x => x.id != action.data.id)
      }
    case types.SET_DEFAULT_UPDATE:
      return {
        ...state,
        data: state.data.filter(x => {
          if (x.id == action.data.id) {
            return x.is_default = 1
          } else {
            x.is_default = 0
            return true
          }
        })
      }
    default:
      return state;
  }
};
