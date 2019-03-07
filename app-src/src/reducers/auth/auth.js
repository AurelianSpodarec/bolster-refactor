import {
    AUTHORIZE_REQUEST,
    AUTHORIZE_SUCCESS,
    AUTHORIZE_FAILURE
} from 'constants/actionTypes/auth';

export const initialState = {
    isAuthorized: false,
    checkComplete: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZE_REQUEST:
            return initialState;
        case AUTHORIZE_SUCCESS:
            return {
                checkComplete: true,
                isAuthorized: true
            };
        case AUTHORIZE_FAILURE:
            return {
                checkComplete: true,
                isAuthorized: false
            };
        default:
            return state;
    }
};
