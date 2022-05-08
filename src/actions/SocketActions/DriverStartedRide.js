import { DRIVER_STARTED_RIDE, RESET_DRIVER_STARTED_RIDE } from "../ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: DRIVER_STARTED_RIDE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_STARTED_RIDE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_STARTED_RIDE.FAILURE
  };
}

export function reset() {
  return {
    type: RESET_DRIVER_STARTED_RIDE
  };
}
