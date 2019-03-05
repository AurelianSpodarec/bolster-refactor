import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE
} from 'constants/actionTypes/profile';

const initialState = {
    profile: {},
    isFetching: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROFILE_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                profile: action.payload
            };
        case FETCH_PROFILE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };
        default:
            return state;
    }
};
