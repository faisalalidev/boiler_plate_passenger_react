import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_RIDE_RATING } from "../../config/WebService";
import { success, failure } from "../../actions/SocketActions/RideRating";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";
let callbackRef;
function* requestEmitRideRating() {
  while (true) {
    const { payload, callback } = yield take(types.RIDE_RATING.REQUEST);
    callbackRef = callback;
    yield call(SocketIO.getInstance().requestEmit, API_RIDE_RATING, payload);
  }
}

function channelRideRating() {
  return eventChannel(emitter => {
    const success = response => {
      console.log("from saga", response);
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
      console.log("from saga", error);
    };
    SocketIO.getInstance().requestOn(API_RIDE_RATING, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchRideRating() {
  const socketChannel = yield call(channelRideRating);
  while (true) {
    try {
      let response = yield take(socketChannel);
      if (callbackRef) {
        callbackRef(response);
      }
      yield put(success(response));
    } catch (err) {
      console.log(err.message);
      yield put(failure(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchRideRating);
  yield fork(requestEmitRideRating);
}
