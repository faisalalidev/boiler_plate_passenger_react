import { take, put, call, fork, select } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_PROFILE } from "../config/WebService";
import { success, failure } from "../actions/UserProfile";
import { getUser } from "../reducers/selectors";
import Utils from "../util";

function callRequest(data) {
  // console.log("Get ");
  const token = Utils.getUserToken();

  console.log("callRequest : ", token);

  const header = {
    "user-token": Utils.getUserToken()
  };

  return ApiSauce.get(API_PROFILE, data, header);
}

function* watchRequest() {
  while (true) {
    
    const { payload } = yield take(types.PASSENGER_PROFILE.REQUEST);

    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
    } catch (err) {
      console.log(" Saga Error  : ", err);
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
