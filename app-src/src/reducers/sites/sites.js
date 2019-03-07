import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_SITES_REQUEST,
    FETCH_SITES_SUCCESS,
    FETCH_SITES_FAILURE,
    FETCH_SITE_REQUEST,
    FETCH_SITE_SUCCESS,
    FETCH_SITE_FAILURE
} from 'constants/actionTypes/sites';

export const initialState = {
    sites: {},
    isFetching: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SITES_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_SITES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                sites: convertArrToObj(action.payload)
            };
        case FETCH_SITES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };
        case FETCH_SITE_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_SITE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                sites: {
                    ...state.sites,
                    [action.payload.id.toString()]: action.payload
                }
            };
        case FETCH_SITE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };
        default:
            return state;
    }
};
