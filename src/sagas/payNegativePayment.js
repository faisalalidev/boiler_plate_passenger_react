import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_PAY_NEGATIVE_CHARGE } from "../config/WebService";
import Utils from "../util";

function callRequest(data) {
  const header = {
    "user-token": Utils.getUserToken()
  };
  return ApiSauce.post(API_PAY_NEGATIVE_CHARGE, data, header);
}
function* watchRequest() {
  while (true) {
    const { payload, success, failure } = yield take(
      types.PAY_NEGATIVE_PAYMENT.REQUEST
    );
    try {
      const response = yield call(callRequest, payload);
      success(response.data);
    } catch (err) {
      failure(err.message);
    }
  }
}
export default function* root() {
  yield fork(watchRequest);
}
