import { SHORTEST_PATH, DECODE_POLYLINE } from "../ActionTypes";

export function request(data: Object, callback: Object) {
  return {
    payload: data,
    type: SHORTEST_PATH.REQUEST,
    callback
  };
}

export function success(data: Object) {
  return {
    data,
    type: SHORTEST_PATH.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: SHORTEST_PATH.FAILURE
  };
}
export function decodePolyline(data: Object, callback) {
  return {
    data,
    type: DECODE_POLYLINE,
    callback
  };
}
