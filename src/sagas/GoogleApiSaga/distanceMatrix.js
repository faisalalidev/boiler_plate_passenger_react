import { take, put, call, fork, select } from "redux-saga/effects";

import * as types from "../../actions/ActionTypes";
import { API_DISTANCEMATRIX } from "../../config/WebService";
import {
  success,
  failure
} from "../../actions/GoogleApiActions/DistanceMatrixAction";

import Utils from "../../util";
import GoogleApiSauce from "../../services/GoogleApiSauce";
import Polyline from "@mapbox/polyline";

function callRequest(data) {
  return GoogleApiSauce.get(API_DISTANCEMATRIX, data);
}

function* watchRequest() {
  while (true) {
    const { payload, callback } = yield take(types.DISTANCE_MATRIX.REQUEST);

    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
      callback();
    } catch (err) {
      console.log(" Saga Error  : ", err);
      yield put(failure(err));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
