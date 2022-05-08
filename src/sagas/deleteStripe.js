import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { DELETE_STRIPE,APPLICATION_TOKEN } from "../config/WebService";
import { success, failure } from "../actions/DeleteStripeAction";
import { remove } from "../actions/GetStripeAction";
import { NavigationActions } from "react-navigation";
import Utils from "../util";

function callRequest(data) {
  const header = {
    "token":APPLICATION_TOKEN,
    "user-token": Utils.getUserToken()
  };
  return ApiSauce.post(DELETE_STRIPE, data, header);
}


function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.DELETE_STRIPE.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
      yield put(remove(response.data));
      Utils.MessageAlertSuccess("Success", "Card remove successfully")
      yield put(NavigationActions.back());



    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}