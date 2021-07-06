import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import LoginVideo from '_content/videos/frontend/Login.mp4';
import LoginPoster from '_content/videos/frontend/posters/Login.jpg';

import postResendConfirmEmail from 'actions/shared/auth/async/postResendConfirmEmail';

import { componentDidMount, componentWillUnmount } from 'helpers/generic';
import { useIsMobile } from 'helpers/hooks';

import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const EmailConfirmationRequired = () => {
    const isMobile = useIsMobile(1101);
    const history = useHistory();
    const emailToConfirm = useSelector(emailConfirmSelector);
    const dispatch = useDispatch();
    const [isEmailSent, setEmailSent] = useState(false);
    let timeout = null;

    componentDidMount(() => {
        if (!emailToConfirm) {
            history.push('/auth/login');
        }
    });

    componentWillUnmount(() => {
        if (timeout) {
            clearTimeout(timeout);
        }
    });

    const handleResendConfirmation = () => {
        if (isEmailSent) return;
        const oneMinuteinMS = 1000 * 60;
        dispatch(postResendConfirmEmail({ email: emailToConfirm }));
        setEmailSent(true);
        timeout = setTimeout(() => {
            setEmailSent(false);
        }, oneMinuteinMS);
    };

    return (
        <div id="login">
            <div className="auth-background"></div>
            <video
                className="auth-background-video"
                autoPlay={!isMobile}
                loop
                muted
                poster={LoginPoster}
            >
                <source src={LoginVideo} type="video/mp4" />
            </video>
            <div className="auth-wrapper">
                <div className="heading-body-wrapper"></div>

                <div className="auth-form-wrapper login">
                    <FrontEndFormHeading title="Email confirmation required" classes="smaller" />

                    <div className="auth-text-wrapper login-text">
                        <p style={{ marginBottom: 30 }}>
                            To complete your registration, please confirm your email address through
                            the link sent to your inbox.
                        </p>
                        <FrontEndButton
                            classes="gray left"
                            type="submit"
                            handleClick={handleResendConfirmation}
                        >
                            Re-send confirmation email
                        </FrontEndButton>
                        {isEmailSent && (
                            <p style={{ textAlign: 'center', color: 'red' }}>
                                Please check your e-mail for a link!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const emailConfirmSelector = ({
    shared: {
        loginReducer: { emailConfirmationRequired },
    },
}) => emailConfirmationRequired;

export default EmailConfirmationRequired;
