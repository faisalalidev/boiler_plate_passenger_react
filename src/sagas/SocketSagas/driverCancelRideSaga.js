import { take, put, call, fork, select } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_DRIVER_CANCEL_RIDE } from "../../config/WebService";

import {
  success as successDriverCancelRide,
  failure as failureDriverCancelRide
} from "../../actions/SocketActions/DriverCancelRide";
import { success, failure, stateChange } from "../../actions/AppStateActions";
import { locationDropOffReset } from "../../actions/GoogleAutoComplete";
import { reset as resetRequestRide } from "../../actions/SocketActions/RequestRide";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";
import Utils from "../../util";

// function* requestEmitDriverCompleteRide() {
//   while (true) {
//     const { payload } = yield take(types.DRIVER_COMPLETED_RIDE.REQUEST);
//     yield call(
//       SocketIO.getInstance().requestEmit,
//       API_DRIVER_CANCEL_RIDE,
//       payload
//     );
//   }
// }

function channelDriverCancelRide() {
  return eventChannel(emitter => {
    const success = response => {
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(API_DRIVER_CANCEL_RIDE, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}

function* watchDriverCancelRide() {
  const socketChannel = yield call(channelDriverCancelRide);
  while (true) {
    try {
      let response = yield take(socketChannel);
      yield put(successDriverCancelRide(response));
      yield put(stateChange(true, types.SHOW_HOME_VIEWS));
      yield put(locationDropOffReset());
      yield put(resetRequestRide());

      Utils.MessageAlertSuccess("", "Driver has cancel ride ");
    } catch (err) {
      yield put(failureDriverCancelRide(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchDriverCancelRide);
}
