import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { DEFAULT_CARD,APPLICATION_TOKEN } from "../config/WebService";
import { success, failure } from "../actions/DefaultCardAction";
import { NavigationActions } from "react-navigation";
import { defaultUpdate } from "../actions/GetStripeAction";
import Utils from "../util";

function callRequest(data) {
  const header = {
    "token":APPLICATION_TOKEN,
    "user-token": Utils.getUserToken()
  };
  return ApiSauce.post(DEFAULT_CARD, data, header);
}


function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.DEFAULT_CARD.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
      yield put(defaultUpdate(response.data));
      Utils.MessageAlertSuccess("Success", "Card default successfully")
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}