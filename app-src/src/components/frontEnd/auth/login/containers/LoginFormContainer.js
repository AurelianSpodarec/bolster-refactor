import React, { useEffect } from 'react';
import { useForm, usePrevious, useResend2FA } from 'helpers/hooks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoginForm from '../presentational/LoginForm';
import postLogin from 'actions/shared/auth/async/postLogin';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL, FORGOT_PASSWORD } from 'constants/shared/modalTypes';
import { authenticate } from 'helpers/api';
import { COMPANY_USER_ROLE_TYPES as ROLES } from 'constants/companyAdmin/enums';
import { FETCH_COMPANY_SETTINGS_SUCCESS } from 'constants/actionTypes/companySettings';
import { checkActive } from 'actions/companyAdmin/subscriptions/async/checkActive';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import fetchAuthAreaText from 'actions/frontEnd/auth/fetchAuthAreaText';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const LoginFormContainer = ({
    showModal,
    addFieldError,
    showFieldErrors,
    fetchCompanySettings,
    postLogin,
    postSuccess,
    history,
    isPosting,
    error,
    fetchAuthAreaText,
    auth,
    showTwoFactor,
    emailConfirmationRequired,
    hideModal,
}) => {
    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery();
    const showForgotPassword = query.get('showForgotPassword');
    const [formData, handleChange] = useForm({ email: '', password: '', twoFactorCode: null });
    const prevProps = usePrevious({
        postSuccess,
        isPosting,
        emailConfirmationRequired,
    });

    useEffect(() => {
        fetchAuthAreaText();

        if (history.action.includes('REPLACE')) {
            window.location.reload();
        }
        if (showForgotPassword) {
            handleForgotPassword();
        }

        return () => hideModal();
    }, []);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            onSuccess();
        }

        if (prevProps.isPosting && !isPosting && error) {
            showModal(ERROR_MODAL, {
                message: 'There was an error with your request. Please try again.',
            });
        }
    }, [postSuccess, prevProps.postSuccess, isPosting, prevProps.isPosting]);

    useEffect(() => {
        if (emailConfirmationRequired && !prevProps.emailConfirmationRequired) {
            // take us to the confirm email page bro
            history.push('/auth/email-confirmation-required');
        }
    }, [emailConfirmationRequired]);

    const { canResend2FA, setCanResend2FA, lastResent, handleResendTwoFactor } = useResend2FA(
        formData.email,
    );

    return (
        <LoginForm
            formData={{ ...formData }}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleForgotPassword={handleForgotPassword}
            isPosting={isPosting}
            loginText={auth.loginText}
            showTwoFactor={showTwoFactor}
            canResend2FA={canResend2FA}
            setCanResend2FA={setCanResend2FA}
            lastResent={lastResent}
            handleResendTwoFactor={handleResendTwoFactor}
        />
    );

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password, twoFactorCode } = formData;
        postLogin(email, password, twoFactorCode);
    }

    function handleForgotPassword() {
        showModal(FORGOT_PASSWORD);
    }

    async function onSuccess() {
        const {
            isSuperAdmin,
            isCompanyAdmin,
            companyUserType,
            companyID,
            isClientAccess,
        } = await authenticate();

        if (+companyUserType === ROLES.OPERATIVE) {
            localStorage.removeItem('token');
            addFieldError(
                'password',
                'Operatives logins are not permitted to use the desktop site.',
            );
            showFieldErrors();
            return;
        }

        if (+companyUserType === ROLES.OWNER) {
            const { payload, type } = await fetchCompanySettings('LOGIN FORM');
            if (type === FETCH_COMPANY_SETTINGS_SUCCESS) {
                localStorage.setItem('colourCode', payload.colourCode);
            }
        }

        if (isSuperAdmin) {
            return history.push('/admin');
        }
        if (isCompanyAdmin) {
            if (!companyID) return history.push('/company/company-selection');
            else {
                const hasSub = await checkActive(companyID);
                if (hasSub) {
                    return history.push('/company');
                }
            }
        }
        if (!isClientAccess) {
            return history.push('/company');
        }
        return history.push('/client/companies');
    }
};

const mapStateToProps = ({
    shared: {
        loginReducer: { postSuccess, isPosting, showTwoFactor, emailConfirmationRequired },
    },
    frontEnd: {
        authReducer: { auth },
        error,
    },
}) => ({
    postSuccess,
    auth,
    error,
    isPosting,
    showTwoFactor,
    emailConfirmationRequired,
});

const mapDispatchToProps = {
    showModal,
    hideModal,
    addFieldError,
    showFieldErrors,
    fetchCompanySettings,
    postLogin,
    fetchAuthAreaText,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer));
