// @flow

import { SOCKET_LOGIN } from "../ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: SOCKET_LOGIN.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: SOCKET_LOGIN.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: SOCKET_LOGIN.FAILURE
  };
}
