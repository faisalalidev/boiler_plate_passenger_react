import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_APP_STATUS } from "../../config/WebService";
import { success, failure, stateChange } from "../../actions/AppStateActions";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";
import { locationDropOffReset } from "../../actions/GoogleAutoComplete";
import {
  resetConditional,
  reset as resetRequestRide,
  success as successRequestRide
} from "../../actions/SocketActions/RequestRide";
import { success as successDriverStartedRide } from "../../actions/SocketActions/DriverStartedRide";
import { success as successDriverCompleteRide } from "../../actions/SocketActions/DriverCompleteRide";

function channelCancelRide() {
  return eventChannel(emitter => {
    const success = response => {
      console.log("from saga", response);
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
      console.log("from saga", error);
    };
    SocketIO.getInstance().requestOn(API_APP_STATUS, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchCancelRide() {
  const socketChannel = yield call(channelCancelRide);
  while (true) {
    try {
      let response = yield take(socketChannel);
      if (response.user_app_status === "home_page") {
        yield put(stateChange(true, types.SHOW_HOME_VIEWS));
        yield put(locationDropOffReset());
        yield put(resetRequestRide());
      } else if (response.user_app_status === "ride_accepted") {
        yield put(successRequestRide(response));
      } else if (response.user_app_status === "on_ride") {
        yield put(successDriverStartedRide(response));
      } else if (response.user_app_status === "complete_ride") {
        yield put(successDriverCompleteRide(response));
      } else if (response.user_app_status === "request_ride") {
        yield put(stateChange(true, types.SHOW_RIDE_SEARCHING_VIEWS));
      }
      console.log("app_status", response);
      //   yield put(success(response));
    } catch (err) {
      console.log(err.message);
      yield put(failure(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchCancelRide);
}
