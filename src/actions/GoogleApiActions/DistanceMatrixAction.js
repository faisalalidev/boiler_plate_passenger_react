import { DISTANCE_MATRIX } from "../ActionTypes";

export function request(data: Object, callback: Object) {
  return {
    payload: data,
    type: DISTANCE_MATRIX.REQUEST,
    callback
  };
}

export function success(data: Object) {
  return {
    data,
    type: DISTANCE_MATRIX.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DISTANCE_MATRIX.FAILURE
  };
}
