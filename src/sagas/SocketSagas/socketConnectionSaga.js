import {
  take,
  put,
  call,
  fork,
  select,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";
import { socketInfoListener } from "../../actions/SocketActions/SocketConnetion";
import * as types from "../../actions/ActionTypes";
import { BASE_URL_SOCKET } from "../../config/WebService";

function* requestSocketInitialize() {
  while (true) {
    const { payload } = yield take(types.SOCKET_CONNECT.REQUEST);
    yield call(SocketIO.initialize, BASE_URL_SOCKET, payload);
  }
}

function createConnection() {
  return eventChannel(emitter => {
    const success = () => {
      console.log("from saga connect", true);
      const connected = true;
      emitter(connected);
    };
    // SocketIO.getInstance().socketInstance.on("connect", success);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}

export function* watchConnection() {
  const socket = yield call(SocketIO.init);
  console.log("watchConnection", socket);
  while (true) {
    try {
      //   console.log(socket);
      const socketChannel = yield call(createConnection);
      // An error from socketChannel will cause the saga jump to the catch block
      const connected = yield take(socketChannel);
      console.log("response", connected);

      yield put(socketInfoListener(connected));
    } catch (err) {
      console.error("socket error:", err);
    }
  }
}
export default function* root() {
  yield fork(watchConnection);
  yield fork(requestSocketInitialize);
}
