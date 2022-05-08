import { take, put, call, fork, select } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_CHANGE_PASSWORD } from "../config/WebService";
import { success, failure } from "../actions/DriverProfileUpdate";
import { getUser } from "../reducers/selectors";
import Utils from "../util";
import { NavigationActions } from "react-navigation";

function callRequest(data) {
  const token = Utils.getUserToken();
  const header = {
    "user-token": Utils.getUserToken()
  };

  return ApiSauce.post(API_CHANGE_PASSWORD, data, header);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.CHANGE_PASSWORD.REQUEST);

    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
      Utils.MessageAlertSuccess("", response.message);
      yield put(NavigationActions.navigate({ routeName: "profile" }));
    } catch (err) {
      //   Utils.MessageAlertError("", err.message ? err.message : "");
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
