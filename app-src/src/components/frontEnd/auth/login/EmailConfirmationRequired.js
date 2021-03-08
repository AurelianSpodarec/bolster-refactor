import postResendConfirmEmail from 'actions/shared/auth/async/postResendConfirmEmail';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import { componentDidMount, componentWillUnmount } from 'helpers/generic';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const EmailConfirmationRequired = () => {
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
        <div
            className="auth-form-wrapper"
            style={{ display: 'flex', width: '100%', textAlign: 'center' }}
        >
            <FrontEndFormHeading title="Confirm e-mail" classes="smaller" />
            <Field classes="auth-form-field">
                <p>
                    Your e-mail address has not yet been confirmed! Please check your e-mails and
                    click the link to confirm your e-mail address, then log in.
                </p>
                <ButtonContainer handleClick={handleResendConfirmation}>
                    Re-send confirmation email
                </ButtonContainer>
                {/* todo message */}
                {isEmailSent && (
                    <p style={{ textAlign: 'center', color: 'red' }}>
                        Please check your e-mail for a link!
                    </p>
                )}
            </Field>
        </div>
    );
};

const emailConfirmSelector = ({
    shared: {
        loginReducer: { emailConfirmationRequired },
    },
}) => emailConfirmationRequired;

export default EmailConfirmationRequired;
