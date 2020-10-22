import React, { useEffect } from 'react';
import CookieConsent from '../presentational/CookieConsent';
import { connect } from 'react-redux';

import { useLocalStorage } from 'helpers/frontEndHooks';
import setCookieConsentClass from 'actions/frontEnd/layout/setCookieConsentClass';

const CookieConsentContainer = ({ setCookieConsentClass }) => {
    const [cookieConsent, setCookieConsent] = useLocalStorage('cookieConsent', false);

    useEffect(() => {
        if (window.localStorage.getItem('cookieConsent')) {
            setCookieConsentClass(true);
        }
    }, []);

    const handleAcceptedClick = () => setCookieConsent(true);

    return <CookieConsent consent={cookieConsent} handleAcceptedClick={handleAcceptedClick} />;
};

const mapDispatchToProps = {
    setCookieConsentClass,
};
export default connect(null, mapDispatchToProps)(CookieConsentContainer);
