import { combineReducers } from 'redux';

import { COOKIE_CONSENT } from 'constants/actionTypes/cookie';

export default combineReducers({ cookieConsent: cookieConsentReducer });

function cookieConsentReducer(state = false, action) {
    switch (action.type) {
        case COOKIE_CONSENT:
            return true;
        default:
            return state;
    }
}
