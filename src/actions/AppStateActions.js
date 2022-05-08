import { APP_STATUS } from "./ActionTypes";

export function stateChange(data: Boolean, type: String) {
  return {
    payload: data,
    type
  };
}
export function success(data: Object) {
  return {
    data,
    type: APP_STATUS.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: APP_STATUS.FAILURE
  };
}
