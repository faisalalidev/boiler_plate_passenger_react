// @flow
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = {
    failure: false,
    isFetching: false,
    errorMessage: "",
    data: {}
};

export default (state: Object = initialState, action: Object) => {
    switch (action.type) {
        case types.TRIP_DETAILS.REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case types.TRIP_DETAILS.SUCCESS:
            return {
                ...state,
                failure: false,
                isFetching: false,
                errorMessage: "",
                data: action.data
            };
        case types.TRIP_DETAILS.FAILURE:
            return {
                ...state,
                failure: true,
                isFetching: false,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
};
