import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_GOES_HERE } from "../constants";
import { success, failure } from "../actions/ACTION_PATH_GOES_HERE";

function callRequest(data) {
  return ApiSauce.post(API_GOES_HERE, data);
}

function* watchRequest() {
  while (true) {
    const { value } = yield take(types.ACTION_GOES_HERE.REQUEST);
    try {
      const payload = { value };
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
