// @flow

import { GET_STRIPE,GET_STRIPE_LIST_UPDATE,GET_STRIPE_LIST_REMOVE,SET_DEFAULT_UPDATE } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: GET_STRIPE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_STRIPE.SUCCESS
  };
}

export function update(data: Object) {
  return {
    data,
    type: GET_STRIPE_LIST_UPDATE
  };
}
export function remove(data: Object) {
  return {
    data,
    type: GET_STRIPE_LIST_REMOVE
  };
}
export function defaultUpdate(data: Object) {
  return {
    data,
    type: SET_DEFAULT_UPDATE
  };
}
export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_STRIPE.FAILURE
  };
}
