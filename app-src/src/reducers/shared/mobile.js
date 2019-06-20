import { combineReducers } from 'redux';

import { SET_MOBILE, TOGGLE_MOBILE_MENU } from 'constants/actionTypes/generic';

export default combineReducers({
    onMobile: checkMobileReducer,
    menuOpen: menuToggleReducer
});

function checkMobileReducer(state = false, action) {
    switch (action.type) {
        case SET_MOBILE:
            return action.isMobile;
        default:
            return state;
    }
}

function menuToggleReducer(state = false, action) {
    switch (action.type) {
        case TOGGLE_MOBILE_MENU:
            return !state;
        default:
            return state;
    }
}
