import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_PASSENGER_CANCEL_RIDE } from "../../config/WebService";
import { success, failure } from "../../actions/SocketActions/CancelRide";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

let callbackRef;
function* requestEmitCancelRide() {
  while (true) {
    const { payload, callBack } = yield take(types.CANCEL_RIDE.REQUEST);
    callbackRef = callBack;
    yield call(
      SocketIO.getInstance().requestEmit,
      API_PASSENGER_CANCEL_RIDE,
      payload
    );
  }
}
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
    SocketIO.getInstance().requestOn(
      API_PASSENGER_CANCEL_RIDE,
      success,
      failure
    );
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchCancelRide() {
  const socketChannel = yield call(channelCancelRide);
  while (true) {
    try {
      let response = yield take(socketChannel);

      yield put(success(response));
      if (callbackRef) {
        callbackRef(response);
      }
    } catch (err) {
      console.log(err.message);
      yield put(failure(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchCancelRide);
  yield fork(requestEmitCancelRide);
}
