import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_GETALLVEHICLETYPES } from "../../config/WebService";
import { success, failure } from "../../actions/SocketActions/VehicleCategory";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

function* requestEmitGetAllVehicleTypes() {
  while (true) {
    const { payload } = yield take(types.VEHICLE_CATEGORY.REQUEST);
    yield call(
      SocketIO.getInstance().requestEmit,
      API_GETALLVEHICLETYPES,
      payload
    );
  }
}
function channelGetAllVehicleTypes() {
  return eventChannel(emitter => {
    const success = response => {
      console.log("from saga", response);
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
      console.log("from saga", error);
    };
    SocketIO.getInstance().requestOn(API_GETALLVEHICLETYPES, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchGetAllVehicleTypes() {
  const socketChannel = yield call(channelGetAllVehicleTypes);
  while (true) {
    try {
      let response = yield take(socketChannel);
      console.log("data", response);
      yield put(success(response));
    } catch (err) {
      console.log(err.message);
      yield put(failure(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchGetAllVehicleTypes);
  yield fork(requestEmitGetAllVehicleTypes);
}
