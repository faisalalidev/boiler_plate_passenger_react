// @flow

import { DEFAULT_CARD } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: DEFAULT_CARD.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DEFAULT_CARD.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DEFAULT_CARD.FAILURE
  };
}
