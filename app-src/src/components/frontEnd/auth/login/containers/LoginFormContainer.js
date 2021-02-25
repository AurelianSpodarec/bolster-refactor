import React, { useEffect, useState } from 'react';
import { useForm, usePrevious } from 'helpers/hooks';
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
}) => {
    const [formData, handleChange] = useForm({ email: '', password: '', twoFactorCode: null });
    const prevProps = usePrevious({ postSuccess, isPosting });

    useEffect(() => {
        fetchAuthAreaText();

        if (history.action.includes('REPLACE')) {
            window.location.reload();
        }
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

    return (
        <LoginForm
            formData={{ ...formData }}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleForgotPassword={handleForgotPassword}
            isPosting={isPosting}
            loginText={auth.loginText}
            showTwoFactor={showTwoFactor}
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
        const { isSuperAdmin, companyUserType, companyID, isClientAccess } = await authenticate();

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
            const { payload, type } = await fetchCompanySettings();
            if (type === FETCH_COMPANY_SETTINGS_SUCCESS) {
                localStorage.setItem('colourCode', payload.colourCode);
            }
        }

        let url = '/client/companies';

        if (companyID) {
            if (!isClientAccess) url = '/company';
            else {
                const hasSub = await checkActive(companyID);
                if (hasSub) {
                    url = '/company';
                } else {
                    url = '/client/companies';
                }
            }
        }
        if (isSuperAdmin) url = '/admin';
        history.push(url);
    }
};

const mapStateToProps = ({
    shared: {
        loginReducer: { postSuccess, isPosting, showTwoFactor },
    },
    frontEnd: {
        authReducer: { auth: auth },
        error,
    },
}) => ({ postSuccess, auth, error, isPosting, showTwoFactor });

const mapDispatchToProps = {
    showModal,
    addFieldError,
    showFieldErrors,
    fetchCompanySettings,
    postLogin,
    fetchAuthAreaText,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer));
