import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_CLIENTS_REQUEST,
    FETCH_CLIENTS_SUCCESS,
    FETCH_CLIENTS_FAILURE
} from 'constants/actionTypes/sites';

export const initialState = { clients: {}, isFetching: false, error: null };

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLIENTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_CLIENTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                clients: convertArrToObj(action.payload)
            };
        case FETCH_CLIENTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };

        default:
            return state;
    }
};
