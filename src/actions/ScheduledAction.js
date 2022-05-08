// @flow

import { SCHEDULED } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: SCHEDULED.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: SCHEDULED.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: SCHEDULED.FAILURE
  };
}
