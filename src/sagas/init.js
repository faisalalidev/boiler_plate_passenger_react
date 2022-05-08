import { LOAD } from "redux-storage";
import { take, fork, select, put, call } from "redux-saga/effects";

import { getUser, getSocketLogin } from "../reducers/selectors";
import { NavigationActions, StackActions } from "react-navigation";
import Utils from "../util";
import SocketIO from "../services/SocketIO";
import {
  socketInfoListener,
  request
} from "../actions/SocketActions/SocketConnetion";
import { APPLICATION_TOKEN } from "../config/WebService";

function* watchReduxLoadFromDisk() {
  while (true) {
    yield take(LOAD);

    try {
      const { data } = yield select(getUser);
      const socketLoginData = yield select(getSocketLogin);
      console.log("Data  init saga  : ", socketLoginData, "GETUSER : ", data);

      if (data.id && data.token) {
        Utils.setUserToken(data.token);
        Utils.setUserIDFromSocket(data.id);
        // Utils.setSocketAccessToken(socketLoginData.data.accesstoken);
        yield put(
          request({
            "user-token": data.token,
            user_id: data.id,
            token: APPLICATION_TOKEN
          })
        );
        yield put(NavigationActions.navigate({ routeName: "home" }));
      }
      NavigationActions.navigate({ routeName: "login" });
      Utils.setDeviceToken("");

      console.log("Saga init working ");
    } catch (err) {
      console.warn("saga watchReduxLoadFromDisk error: ", err);
    }
  }
}

export default function* root() {
  yield fork(watchReduxLoadFromDisk);
}
