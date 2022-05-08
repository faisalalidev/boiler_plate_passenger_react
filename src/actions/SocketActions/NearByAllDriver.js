// @flow

import { NEARBY_ALL_DRIVER } from "../ActionTypes";
import SocketIO from "../../services/SocketIO";
import { take, put, call, fork, select } from "redux-saga/effects";
import { API_NEARBYWITHVEHICLETYPE } from "../../config/WebService";

export function request(data: Object, callback: function) {
  return {
    payload: data,
    callback,
    type: NEARBY_ALL_DRIVER.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: NEARBY_ALL_DRIVER.SUCCESS
  };
}

export function failure(errorMessage: String) {
  return {
    errorMessage,
    type: NEARBY_ALL_DRIVER.FAILURE
  };
}
export function on() {
  return {
    type: NEARBY_ALL_DRIVER.ON
  };
}
