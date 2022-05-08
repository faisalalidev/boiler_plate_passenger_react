import {
  take,
  put,
  call,
  fork,
  select,
  takeEvery,
  takeLatest,
  apply
} from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_NEARBYWITHVEHICLETYPE } from "../../config/WebService";
import {
  success as successNearByAllDriver,
  failure as failureNearByAllDriver
} from "../../actions/SocketActions/NearByAllDriver";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

let callbackRef;

function* requestEmitNearByWithVehicleType() {
  while (true) {
    const { payload, callback } = yield take(types.NEARBY_ALL_DRIVER.REQUEST);
    callbackRef = callback;
    yield call(
      SocketIO.getInstance().requestEmit,
      API_NEARBYWITHVEHICLETYPE,
      payload
    );
  }
}
function channelNearByWithVehicleType() {
  return eventChannel(emitter => {
    const success = response => {
      console.log("emiiter nearby", response);
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
      console.log("from saga", error);
    };
    SocketIO.getInstance().requestOn(
      API_NEARBYWITHVEHICLETYPE,
      success,
      failure
    );
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchNearByWithVehicleType() {
  const socketChannel = yield call(channelNearByWithVehicleType);
  while (true) {
    try {
      let response = yield take(socketChannel);
      console.log("saga near by", response);

      yield put(successNearByAllDriver(response));

      if (callbackRef) {
        callbackRef(response);
      }
    } catch (err) {
      console.log(err.message);
      yield put(failureNearByAllDriver(err.message));
      //   socketChannel.close();
    }
  }
}
export default function* root() {
  //   yield fork(watchNearByWithVehicleType);
  yield fork(requestEmitNearByWithVehicleType);
}
