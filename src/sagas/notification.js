import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { NOTIFICATION } from "../config/WebService";
import { success, failure } from "../actions/NotificationAction";
import Utils from "../util";

function callRequest(data) {
  const header = {
    "user-token": Utils.getUserToken()
  };
  return ApiSauce.get(NOTIFICATION, data, header);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.NOTIFICATION.REQUEST);

    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
