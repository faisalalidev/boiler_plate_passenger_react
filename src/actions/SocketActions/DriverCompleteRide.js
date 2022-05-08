import { DRIVER_COMPLETED_RIDE } from "../ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: DRIVER_COMPLETED_RIDE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_COMPLETED_RIDE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_COMPLETED_RIDE.FAILURE
  };
}
