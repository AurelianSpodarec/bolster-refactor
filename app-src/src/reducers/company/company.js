import {
    FETCH_COMPANY_REQUEST,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_FAILURE
} from 'constants/actionTypes/company';

const initialState = {
    company: {},
    isFetching: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMPANY_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_COMPANY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                company: action.payload
            };
        case FETCH_COMPANY_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };
        default:
            return state;
    }
};
