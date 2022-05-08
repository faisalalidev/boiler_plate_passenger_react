// @flow

import { ADD_STRIPE } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: ADD_STRIPE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: ADD_STRIPE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: ADD_STRIPE.FAILURE
  };
}
