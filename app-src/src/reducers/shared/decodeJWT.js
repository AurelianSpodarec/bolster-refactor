import {
    DECODE_JWT_REQUEST,
    DECODE_JWT_SUCCESS
} from 'constants/actionTypes/decodeJWT';
import { LOGOUT } from 'constants/actionTypes/auth';

import { combineReducers } from 'redux';

export default combineReducers({
    jwtData: jwtDataReducer
});

function jwtDataReducer(state = {}, action) {
    switch (action.type) {
        case DECODE_JWT_REQUEST:
            return {};
        case DECODE_JWT_SUCCESS:
        case LOGOUT:
            return action.payload;
        default:
            return state;
    }
}
