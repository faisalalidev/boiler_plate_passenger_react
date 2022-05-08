// @flow
import * as types from "../actions/ActionTypes";

const initialState = {
    failure: false,
    isFetching: false,
    errorMessage: "",
    data: {}
};

export default (state: Object = initialState, action: Object) => {
    switch (action.type) {
        case types.FAQ.REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case types.FAQ.SUCCESS:
            return {
                ...state,
                failure: false,
                isFetching: false,
                errorMessage: "",
                data: action.data
            };
        case types.FAQ.FAILURE:
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
