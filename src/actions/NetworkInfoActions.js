// @flow
import * as types from "./ActionTypes";

export function networkInfoListener(isNetworkConnected: boolean = false) {
  return {
    type: types.NETWORK_INFO,
    isNetworkConnected
  };
}
