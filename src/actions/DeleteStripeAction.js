// @flow

import { DELETE_STRIPE } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: DELETE_STRIPE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DELETE_STRIPE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DELETE_STRIPE.FAILURE
  };
}
