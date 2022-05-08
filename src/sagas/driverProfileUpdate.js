import { take, put, call, fork, select } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_PROFILE_UPDATE } from "../config/WebService";
import { success, failure } from "../actions/DriverProfileUpdate";
import { getUser } from "../reducers/selectors";
import { NavigationActions } from "react-navigation";
import Utils from "../util";

function callRequest(data) {
  const token = Utils.getUserToken();
  const header = {
    "user-token": Utils.getUserToken(),
    "Content-Type": "multipart/form-data"
  };

  return ApiSauce.post(API_PROFILE_UPDATE, data, header);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.USER_PROFILE_UPDATE.REQUEST);

    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
      Utils.MessageAlertSuccess("Passenger Profile", response.message);
      // yield put(NavigationActions.navigate({ routeName: "home" }));
    } catch (err) {
      //   Utils.MessageAlertError("", err.message ? err.message : "");
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
