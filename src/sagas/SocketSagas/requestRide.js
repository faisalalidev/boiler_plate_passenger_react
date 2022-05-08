import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_REQUESTRIDE } from "../../config/WebService";
import { success, failure } from "../../actions/SocketActions/RequestRide";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";
let callbackRef;
let failureCallbackRef;
function* requestEmitRequestRide() {
  while (true) {
    const { payload, callback, failureCallback } = yield take(
      types.REQUEST_RIDE.REQUEST
    );
    callbackRef = callback;
    failureCallbackRef = failureCallback;
    yield call(SocketIO.getInstance().requestEmit, API_REQUESTRIDE, payload);
  }
}

function channelRequestRide() {
  return eventChannel(emitter => {
    const success = response => {
      console.log("from saga", response);
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
      console.log("from saga", error);
    };
    SocketIO.getInstance().requestOn(API_REQUESTRIDE, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchRequestRide() {
  const socketChannel = yield call(channelRequestRide);
  while (true) {
    try {
      let response = yield take(socketChannel);
      console.log("watchRequestRide", response);
      if (callbackRef) {
        callbackRef(response);
      }
      yield put(success(response));
    } catch (err) {
      console.log(err.message);
      if (failureCallbackRef) {
        failureCallbackRef(err.message);
      }
      yield put(failure(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchRequestRide);
  yield fork(requestEmitRequestRide);
}
