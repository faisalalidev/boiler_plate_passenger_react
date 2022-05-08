// @flow
import * as types from "../ActionTypes";

export function socketInfoListener(isSocketConnected) {
  return {
    type: types.SOCKET_INFO,
    isSocketConnected
  };
}
export function request(data: Object) {
  return {
    payload: data,
    type: types.SOCKET_CONNECT.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: types.SOCKET_CONNECT.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: types.SOCKET_CONNECT.FAILURE
  };
}
