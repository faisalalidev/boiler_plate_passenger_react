// @flow

import { HISTORY } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: HISTORY.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: HISTORY.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: HISTORY.FAILURE
  };
}
