import { combineReducers } from 'redux';

import {
    PUSH_NOTIFICATION_TO_BANNER,
    REMOVE_NOTIFICATION_TO_BANNER,
    RESET_BANNER,
} from 'constants/actionTypes/banner';

export default combineReducers({
    banner: bannerReducer,
});

function bannerReducer(state = {}, action) {
    switch (action.type) {
        case PUSH_NOTIFICATION_TO_BANNER:
            return { ...state, [action.payload.id]: action.payload };
        case REMOVE_NOTIFICATION_TO_BANNER:
            return { ...state, [action.payload.id]: action.payload };
        case RESET_BANNER:
            return {};
        default:
            return state;
    }
}
