import { GET_PASSENGER_RECENT_LOCATION } from "../ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: GET_PASSENGER_RECENT_LOCATION.REQUEST
  };
}
export function success(data: Object) {
  return {
    data,
    type: GET_PASSENGER_RECENT_LOCATION.SUCCESS
  };
}
export function failure(errorMessage: String) {
  return {
    errorMessage,
    type: GET_PASSENGER_RECENT_LOCATION.FAILURE
  };
}
