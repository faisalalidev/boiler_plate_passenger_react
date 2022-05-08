import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_CALCULATEESTIMATEFARE } from "../../config/WebService";
import {
  success,
  failure
} from "../../actions/SocketActions/CalculateEstimateFare";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

function* requestEmitCalculateEstimateFare() {
  while (true) {
    const { payload } = yield take(types.CALCULATE_ESTIMATE_FARE.REQUEST);
    yield call(
      SocketIO.getInstance().requestEmit,
      API_CALCULATEESTIMATEFARE,
      payload
    );
  }
}

function channelCalculateEstimateFare() {
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
      API_CALCULATEESTIMATEFARE,
      success,
      failure
    );
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchCalculateEstimateFare() {
  const socketChannel = yield call(channelCalculateEstimateFare);
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
  yield fork(watchCalculateEstimateFare);
  yield fork(requestEmitCalculateEstimateFare);
}
