import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_ALL_SITES_REQUEST,
    FETCH_ALL_SITES_SUCCESS,
    FETCH_ALL_SITES_FAILURE,
    FETCH_SINGLE_SITE_REQUEST,
    FETCH_SINGLE_SITE_SUCCESS,
    FETCH_SINGLE_SITE_FAILURE
} from 'constants/actionTypes/sites';

export const initialState = {
    sites: {},
    isFetching: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_SITES_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_ALL_SITES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                sites: convertArrToObj(action.payload)
            };
        case FETCH_ALL_SITES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };
        case FETCH_SINGLE_SITE_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_SINGLE_SITE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                sites: {
                    ...state.sites,
                    [action.payload.id.toString()]: action.payload
                }
            };
        case FETCH_SINGLE_SITE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };
        default:
            return state;
    }
};
