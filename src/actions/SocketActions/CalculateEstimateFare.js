import { CALCULATE_ESTIMATE_FARE } from "../ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: CALCULATE_ESTIMATE_FARE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: CALCULATE_ESTIMATE_FARE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: CALCULATE_ESTIMATE_FARE.FAILURE
  };
}
