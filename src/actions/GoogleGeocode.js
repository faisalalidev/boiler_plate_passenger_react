import { GOOGLE_GEOCODE } from "./ActionTypes";

export function request(data: Object, type: String) {
  return {
    payload: data,
    type: GOOGLE_GEOCODE.REQUEST,
    requestType: type
  };
}

export function success(data: Object) {
  return {
    payload: data,
    type: GOOGLE_GEOCODE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GOOGLE_GEOCODE.FAILURE
  };
}
