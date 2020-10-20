import React from 'react';
import CookieConsent from '../presentational/CookieConsent';
import { useLocalStorage } from 'helpers/frontEndHooks';

const CookieConsentContainer = () => {
    const [cookieConsent, setCookieConsent] = useLocalStorage('cookieConsent', false);

    const handleAcceptedClick = () => setCookieConsent(true);

    return <CookieConsent consent={cookieConsent} handleAcceptedClick={handleAcceptedClick} />;
};

export default CookieConsentContainer;
