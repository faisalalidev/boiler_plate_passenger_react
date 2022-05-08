// @flow

import { USER_PROFILE_UPDATE } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: USER_PROFILE_UPDATE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: USER_PROFILE_UPDATE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: USER_PROFILE_UPDATE.FAILURE
  };
}
