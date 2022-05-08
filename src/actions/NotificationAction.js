// @flow

import { NOTIFICATION } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: NOTIFICATION.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: NOTIFICATION.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: NOTIFICATION.FAILURE
  };
}
