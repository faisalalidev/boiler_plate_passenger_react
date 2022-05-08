// @flow

import {  SIGN_UP } from "../../actions/ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: SIGN_UP.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: SIGN_UP.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: SIGN_UP.FAILURE
  };
}
