// @flow

import { CHANGE_PASSWORD } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: CHANGE_PASSWORD.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: CHANGE_PASSWORD.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: CHANGE_PASSWORD.FAILURE
  };
}
