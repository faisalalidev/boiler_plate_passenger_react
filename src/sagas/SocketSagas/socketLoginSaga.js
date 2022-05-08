import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_DRIVER_SOKECT_LOGIN } from "../../config/WebService";
import {
  success as successSocketLoginAction,
  failure as failureSocketLoginAction
} from "../../actions/SocketActions/SocketLoginAction";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

import Utils from "../../util";

import { NavigationActions } from "react-navigation";
function* requestEmitDriverSocketLogin() {
  while (true) {
    const { payload } = yield take(types.SOCKET_LOGIN.REQUEST);
    const socket = yield call(
      SocketIO.getInstance().requestEmit,
      API_DRIVER_SOKECT_LOGIN,
      payload
    );
    console.log("socket ", socket);
  }
}
function channelDriverSocketLogin() {
  return eventChannel(emitter => {
    const success = response => {
      console.log("from saga", response);
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(API_DRIVER_SOKECT_LOGIN, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchDriverSocketLogin() {
  const socketChannel = yield call(channelDriverSocketLogin);
  while (true) {
    try {
      let response = yield take(socketChannel);
      yield put(successSocketLoginAction(response));
      console.log("response socketLogin Saga : ", response);
      Utils.setSocketAccessToken(response.accesstoken);
      Utils.setUserIDFromSocket(response.user_id);
      yield put(NavigationActions.navigate({ routeName: "home" }));
    } catch (err) {
      yield put(failureSocketLoginAction(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchDriverSocketLogin);
  yield fork(requestEmitDriverSocketLogin);
}
