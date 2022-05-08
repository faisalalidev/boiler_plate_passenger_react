import { take, put, call, fork, select } from "redux-saga/effects";

import * as types from "../../actions/ActionTypes";
import { API_DIRECTION } from "../../config/WebService";
import {
  success,
  failure
} from "../../actions/GoogleApiActions/ShortestPathAction";

import Utils from "../../util";
import GoogleApiSauce from "../../services/GoogleApiSauce";
import Polyline from "@mapbox/polyline";

function callRequest(data) {
  return GoogleApiSauce.get(API_DIRECTION, data);
}

function* watchRequest() {
  while (true) {
    const { payload, callback } = yield take(types.SHORTEST_PATH.REQUEST);

    try {
      const response = yield call(callRequest, payload);
      console.log("response API_DIRECTION ", response.data.routes);
      yield put(success(response.data.routes));
      callback(response.data.routes);
    } catch (err) {
      console.log(" Saga Error  : ", err);
      yield put(failure(err));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
