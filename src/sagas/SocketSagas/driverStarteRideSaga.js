import { take, put, call, fork, select } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_DRIVER_STARTED_RIDE } from "../../config/WebService";

import {
  success as successDriverStartedRide,
  failure as failureDriverStartedRide
} from "../../actions/SocketActions/DriverStartedRide";

import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";
import Utils from "../../util";

// function* requestEmitDriverCompleteRide() {
//   while (true) {
//     const { payload } = yield take(types.DRIVER_COMPLETED_RIDE.REQUEST);
//     yield call(
//       SocketIO.getInstance().requestEmit,
//       API_DRIVER_STARTED_RIDE,
//       payload
//     );
//   }
// }

function channelDriverStartedRide() {
  return eventChannel(emitter => {
    const success = response => {
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(API_DRIVER_STARTED_RIDE, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}

function* watchDriverStartedRide() {
  const socketChannel = yield call(channelDriverStartedRide);
  while (true) {
    try {
      let response = yield take(socketChannel);
      yield put(successDriverStartedRide(response));
      Utils.MessageAlertSuccess("", "Ride Started");
    } catch (err) {
      yield put(failureDriverStartedRide(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchDriverStartedRide);
}
