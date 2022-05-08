// @flow

import { TRIP_DETAILS } from "./ActionTypes";

export function request(data: Object) {
    return {
        payload: data,
        type: TRIP_DETAILS.REQUEST
    };
}

export function success(data: Object) {
    return {
        data,
        type: TRIP_DETAILS.SUCCESS
    };
}

export function failure(errorMessage: Object) {
    return {
        errorMessage,
        type: TRIP_DETAILS.FAILURE
    };
}
