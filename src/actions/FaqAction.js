// @flow

import { FAQ } from "./ActionTypes";

export function request(data: Object) {
    return {
        type: FAQ.REQUEST
    };
}

export function success(data: Object) {
    return {
        data,
        type: FAQ.SUCCESS
    };
}

export function failure(errorMessage: Object) {
    return {
        errorMessage,
        type: FAQ.FAILURE
    };
}
