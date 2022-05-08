// @flow

import { PASSENGER_PROFILE } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: PASSENGER_PROFILE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: PASSENGER_PROFILE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: PASSENGER_PROFILE.FAILURE
  };
}
