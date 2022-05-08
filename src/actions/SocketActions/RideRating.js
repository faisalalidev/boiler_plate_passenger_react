import { RIDE_RATING } from "../ActionTypes";

export function request(data: Object, callback: Function) {
  return {
    payload: data,
    type: RIDE_RATING.REQUEST,
    callback
  };
}

export function success(data: Object) {
  return {
    data,
    type: RIDE_RATING.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: RIDE_RATING.FAILURE
  };
}
