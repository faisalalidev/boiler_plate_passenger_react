import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_GETPASSENGERLOCATION } from "../../config/WebService";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";
import {
  success,
  failure
} from "../../actions/SocketActions/GetPassengerRecentLocation";
function* requestEmitGetPassengerRecentLocation() {
  while (true) {
    const { payload } = yield take(types.GET_PASSENGER_RECENT_LOCATION.REQUEST);
    yield call(
      SocketIO.getInstance().requestEmit,
      API_GETPASSENGERLOCATION,
      payload
    );
  }
}
function channelGetPassengerRecentLocation() {
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
      API_GETPASSENGERLOCATION,
      success,
      failure
    );
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchGetPassengerRecentLocation() {
  const socketChannel = yield call(channelGetPassengerRecentLocation);
  while (true) {
    try {
      let response = yield take(socketChannel);
      console.log("data", response);

      yield put(success(response));
      //   socketChannel.close();
    } catch (err) {
      console.log(err.message);
      yield put(failure(err.message));
      //   socketChannel.close();
    }
  }
}
export default function* root() {
  yield fork(watchGetPassengerRecentLocation);
  yield fork(requestEmitGetPassengerRecentLocation);
}
