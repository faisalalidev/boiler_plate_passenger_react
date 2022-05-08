import { DRIVER_CANCELED_RIDE } from "../ActionTypes";

export function request(data: Object) {
  return {
    payload: data,

    type: DRIVER_CANCELED_RIDE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_CANCELED_RIDE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_CANCELED_RIDE.FAILURE
  };
}
