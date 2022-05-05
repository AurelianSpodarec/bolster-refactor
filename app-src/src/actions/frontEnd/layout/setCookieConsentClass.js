import { COOKIE_CONSENT } from 'constants/actionTypes/cookie';

export default (cookieConsent = false) =>
    dispatch =>
        dispatch({
            type: COOKIE_CONSENT,
            cookieConsent,
        });
