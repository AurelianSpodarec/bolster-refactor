import { combineReducers } from 'redux';

import { SET_MOBILE } from 'constants/actionTypes/generic';

export default combineReducers({
    onMobile: checkMobileReducer
});

function checkMobileReducer(state = false, action) {
    switch (action.type) {
        case SET_MOBILE:
            return action.isMobile;
        default:
            return state;
    }
}
