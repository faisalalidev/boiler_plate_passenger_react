import { take, put, call, fork, select } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_DRIVER_COMPLETED_RIDE } from "../../config/WebService";
import Utils from "../../util";

import {
  success as successDriverCompleteRide,
  failure as failureDriverCompleteRide
} from "../../actions/SocketActions/DriverCompleteRide";

import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

// function* requestEmitDriverCompleteRide() {
//   while (true) {
//     const { payload } = yield take(types.DRIVER_COMPLETED_RIDE.REQUEST);
//     yield call(
//       SocketIO.getInstance().requestEmit,
//       API_DRIVER_COMPLETED_RIDE,
//       payload
//     );
//   }
// }

function channelDriverCompleteRide() {
  return eventChannel(emitter => {
    const success = response => {
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(
      API_DRIVER_COMPLETED_RIDE,
      success,
      failure
    );
    const unsubscribe = () => {};
    return unsubscribe;
  });
}

function* watchDriverCompleteRide() {
  const socketChannel = yield call(channelDriverCompleteRide);
  while (true) {
    try {
      let response = yield take(socketChannel);
      yield put(successDriverCompleteRide(response));
      Utils.MessageAlertSuccess("", "Ride Completed Successfully");
    } catch (err) {
      yield put(failureDriverCompleteRide(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchDriverCompleteRide);
}
