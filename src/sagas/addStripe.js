import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { ADD_STRIPE,APPLICATION_TOKEN } from "../config/WebService";
import { success, failure } from "../actions/AddStripeAction";
import { update } from "../actions/GetStripeAction";
import { NavigationActions } from "react-navigation";
import Utils from "../util";

function callRequest(data) {
  const header = {
    "token":APPLICATION_TOKEN,
    "user-token": Utils.getUserToken()
  };
  return ApiSauce.post(ADD_STRIPE, data, header);
}


function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.ADD_STRIPE.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
      yield put(update(response.data));
      Utils.MessageAlertSuccess("Success", "Card add successfully")
      yield put(NavigationActions.back());
      // yield put(NavigationActions.navigate({ routeName: "home" }));
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}