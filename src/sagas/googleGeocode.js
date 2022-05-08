import { take, put, call, fork, select } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_GEOCODE } from "../config/WebService";
import { success, failure } from "../actions/GoogleGeocode";
import { getUser } from "../reducers/selectors";
import Utils from "../util";
import GoogleApiSauce from "../services/GoogleApiSauce";

function callRequest(data) {
  return GoogleApiSauce.get(API_GEOCODE, data);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.GOOGLE_GEOCODE.REQUEST);

    try {
      const response = yield call(callRequest, payload);
      console.log("response GOOGLE_GEOCODE ", response);
      yield put(success(response.data));
    } catch (err) {
      console.log(" Saga Error  : ", err);
      yield put(failure(err));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
