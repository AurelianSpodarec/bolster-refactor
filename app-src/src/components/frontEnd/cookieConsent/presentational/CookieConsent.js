import React from 'react';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const CookieConsent = ({ consent, handleAcceptedClick }) => {
    return (
        <div
            className="cookie-consent-container"
            style={{
                visibility: `${!consent ? 'visible' : 'hidden'}`,
                pointerEvents: `${!consent ? 'auto' : 'none'}`,
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

export default CookieConsent;
