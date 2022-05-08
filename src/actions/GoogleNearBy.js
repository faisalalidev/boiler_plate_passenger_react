import { GOOGLE_NEARBY } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: GOOGLE_NEARBY.REQUEST
  };
}

export function success(data: Object) {
  return {
    payload: data.results,
    type: GOOGLE_NEARBY.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GOOGLE_NEARBY.FAILURE
  };
}
