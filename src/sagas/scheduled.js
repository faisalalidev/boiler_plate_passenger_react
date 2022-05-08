import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { SCHEDULED } from "../config/WebService";
import { success, failure } from "../actions/ScheduledAction";
import Utils from "../util";

function callRequest(data) {
  const header = {
    "user-token": Utils.getUserToken()
  };
  return ApiSauce.get(SCHEDULED, data, header);
}


function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.SCHEDULED.REQUEST);
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