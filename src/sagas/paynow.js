import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_PAYNOW } from "../config/WebService";
import Utils from "../util";

function callRequest(data) {
  const header = {
    "user-token": Utils.getUserToken()
  };
  return ApiSauce.post(API_PAYNOW, data, header);
}
function* watchRequest() {
  while (true) {
    const { payload, success, failure } = yield take(types.PAY_NOW.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      console.log("paymow", response);
      success(response.data);
    } catch (err) {
      failure(err.message);
    }
  }
}
export default function* root() {
  yield fork(watchRequest);
}
