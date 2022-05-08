import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { GET_STRIPE,APPLICATION_TOKEN } from "../config/WebService";
import { success, failure } from "../actions/GetStripeAction";
import Utils from "../util";

function callRequest(data) {
  const header = {
    "token":APPLICATION_TOKEN,
    "user-token": Utils.getUserToken()
  };
  return ApiSauce.get(GET_STRIPE, data, header);
}


function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.GET_STRIPE.REQUEST);
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