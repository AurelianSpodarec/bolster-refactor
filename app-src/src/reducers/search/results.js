import {
    FETCH_SEARCH_RESULTS_REQUEST,
    FETCH_SEARCH_RESULTS_SUCCESS,
    FETCH_SEARCH_RESULTS_FAILURE
} from 'constants/actionTypes/search';

const initialState = {
    results: [],
    isFetching: false,
    success: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SEARCH_RESULTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                success: false,
                error: null
            };
        case FETCH_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                success: true,
                results: action.payload
            };
        case FETCH_SEARCH_RESULTS_FAILURE:
            return {
                ...state,
                success: false,
                error: action.error.message
            };
        default:
            return state;
    }
};
