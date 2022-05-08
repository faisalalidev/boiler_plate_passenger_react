import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { TRIP_DETAILS, APPLICATION_TOKEN } from "../config/WebService";
import { success, failure } from "../actions/TripDetailsActions";
import Utils from "../util";

function callRequest(data) {
    const header = {
        "user-token": Utils.getUserToken(),
        "token": APPLICATION_TOKEN
    };
    return ApiSauce.post(TRIP_DETAILS, data, header);
}

function* watchRequest() {
    while (true) {
        const { payload } = yield take(types.TRIP_DETAILS.REQUEST);
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