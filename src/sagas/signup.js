import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_SIGNUP, APPLICATION_TOKEN } from "../config/WebService";
import { success, failure } from "../containers/Signup/SignUpAction";
import { NavigationActions } from "react-navigation";
import Utils from "../util";
import { request } from "../actions/SocketActions/SocketConnetion";

function callRequest(data) {
  //   const header = {
  //     "Content-Type": "multipart/form-data"
  //   };
  return ApiSauce.post(API_SIGNUP, data);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.SIGN_UP.REQUEST);
    console.log("payload signup saga : ", payload);
    try {
      const response = yield call(callRequest, payload);
      Utils.setUserToken(response.data.token);
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
      const message = err && err.message ? err.message : "";
      //   Utils.MessageAlertError("", message);
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
