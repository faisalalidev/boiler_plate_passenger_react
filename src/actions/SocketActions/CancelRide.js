import { CANCEL_RIDE } from "../ActionTypes";

export function request(data: Object, callBack) {
  return {
    payload: data,
    callBack,
    type: CANCEL_RIDE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: CANCEL_RIDE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: CANCEL_RIDE.FAILURE
  };
}
