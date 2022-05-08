// @flow

import * as types from "./ActionTypes";

export function request(permissionGranted) {
  return {
    permissionGranted,
    type: types.USER_LOCATION.REQUEST
  };
}

export function success(location) {
  return {
    location,
    type: types.USER_LOCATION.SUCCESS
  };
}

export function failure(errorMessage) {
  return {
    errorMessage,
    type: types.USER_LOCATION.FAILURE
  };
}
