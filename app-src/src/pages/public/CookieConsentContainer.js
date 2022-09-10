import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ButtonContainer from 'components_DEPRECATED/shared/generic/button/containers/ButtonContainer';

import { useLocalStorage } from 'helpers/frontEndHooks';
import setCookieConsentClass from 'actions/frontEnd/layout/setCookieConsentClass';

const CookieConsentContainer = ({ setCookieConsentClass }) => {
    const [cookieConsent, setCookieConsent] = useLocalStorage('cookieConsent', false);

    useEffect(() => {
        if (window.localStorage.getItem('cookieConsent')) {
            setCookieConsentClass(true);
        }
    }, []);

    const handleAcceptedClick = () => {
        setCookieConsent(true);
        return setCookieConsentClass(true);
    };

    return (
        <div
            className="cookie-consent-container"
            style={{
                visibility: `${!cookieConsent ? 'visible' : 'hidden'}`,
                pointerEvents: `${!cookieConsent ? 'auto' : 'none'}`,
            }}
        >
            <div className="cookie-consent-wrapper">
                <h6 className="cookie-consent-message">
                    This website uses cookies to enhance the user experience.
                </h6>
                <div className="button-container">
                    <div className="button-wrapper">
                        <ButtonContainer handleClick={handleAcceptedClick} setColour="#c12a2a">
                            I understand
                        </ButtonContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    setCookieConsentClass,
};
export default connect(null, mapDispatchToProps)(CookieConsentContainer);
