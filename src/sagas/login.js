import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_LOGIN, APPLICATION_TOKEN } from "../config/WebService";
import { success, failure } from "../actions/Login";
import { NavigationActions } from "react-navigation";
import Utils from "../util";
import { request as requestSocketLoginAction } from "../actions/SocketActions/SocketLoginAction";
import { request } from "../actions/SocketActions/SocketConnetion";
function callRequest(data) {
  return ApiSauce.post(API_LOGIN, data);
}

function* watchRequest() {
  while (true) {
    const { payload, callBack } = yield take(types.LOGIN.REQUEST);

    try {

      const response = yield call(callRequest, payload);
      if (callBack) {
        callBack(response);
      }
      Utils.setUserToken(response.data.token);
      Utils.setUserIDFromSocket(response.data.id);
      yield put(
        request({
          "user-token": response.data.token,
          user_id: response.data.id,
          token: APPLICATION_TOKEN
        })
      );

      yield put(success(response.data));

      yield put(NavigationActions.navigate({ routeName: "home" }));
    } catch (err) {
      //   Utils.MessageAlertError("", err.message ? err.message : "");
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
