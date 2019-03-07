import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE
} from 'constants/actionTypes/auth';

const initialState = {
    postSuccess: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_LOGIN_REQUEST: {
            return { ...state, postSuccess: false };
        }

        case POST_LOGIN_SUCCESS: {
            return {
                ...state,
                postSuccess: true
            };
        }

        case POST_LOGIN_FAILURE: {
            return {
                ...state,
                postSuccess: false,
                error: action.error.message
            };
        }

        default:
            return state;
    }
};
