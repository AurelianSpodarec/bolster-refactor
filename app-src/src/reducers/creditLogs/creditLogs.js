import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_CREDIT_LOGS_REQUEST,
    FETCH_CREDIT_LOGS_SUCCESS,
    FETCH_CREDIT_LOGS_FAILURE
} from 'constants/actionTypes/creditLogs';

export const initialState = {
    creditLogs: {},
    isFetching: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CREDIT_LOGS_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_CREDIT_LOGS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                creditLogs: convertArrToObj(action.payload)
            };
        case FETCH_CREDIT_LOGS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };
        default:
            return state;
    }
};
