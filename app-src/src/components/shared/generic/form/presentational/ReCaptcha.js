import React from 'react';
import withFieldValidation from '../hocs/withFieldValidation';

import ReCAPTCHA from 'react-google-recaptcha';
import { GOOGLE_SITE_KEY } from 'config/index';

const ReCaptcha = ({ onChange, name, showError }) => {
    return (
        <div className="recaptcha-wrapper">
            <ReCAPTCHA onChange={handleChange} sitekey={GOOGLE_SITE_KEY} />
        </div>
    );

    function handleChange(newValue) {
        onChange(name, newValue);
        showError();
    }
};

export default withFieldValidation(ReCaptcha);
