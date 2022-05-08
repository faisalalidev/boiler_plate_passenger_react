import {
  REQUEST_RIDE,
  REQUEST_RIDE_RESET,
  REQUEST_RIDE_CONDITIONAL_RESET
} from "../ActionTypes";

export function request(data: Object, callback: function, failureCallback) {
  return {
    payload: data,
    callback,
    failureCallback,
    type: REQUEST_RIDE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: REQUEST_RIDE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: REQUEST_RIDE.FAILURE
  };
}
export function reset() {
  return {
    type: REQUEST_RIDE_RESET
  };
}
export function resetConditional() {
  return {
    type: REQUEST_RIDE_CONDITIONAL_RESET
  };
}
