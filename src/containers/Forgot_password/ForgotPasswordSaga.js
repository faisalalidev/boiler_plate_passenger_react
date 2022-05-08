import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../../services/ApiSauce";
import * as types from "../../actions/ActionTypes";
import { API_FORGOT_PASSWORD } from "../../config/WebService";
import { success, failure } from "./ForgotPasswordAction";
import { NavigationActions } from "react-navigation";
import Utils from "../../util";
function callRequest(data) {
  // const header = {
  //   "user-token": "token_here"
  // };
  return ApiSauce.post(API_FORGOT_PASSWORD, data);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.FORGOT_PASSWORD.REQUEST);
    console.log("Login payload ", payload);
    try {
      const response = yield call(callRequest, payload);

      yield put(success(response.data));
      Utils.MessageAlertSuccess("FORGOT PASSWORD ", "Email has been Sent");
      yield put(NavigationActions.navigate({ routeName: "login" }));
    } catch (err) {
      //   const message = err && err.message ? err.message : "";
      //   Utils.MessageAlertError("FORGOT PASSWORD ", message);
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
