import postPasswordReset from 'actions/shared/auth/async/postPasswordReset';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import { useForm } from 'helpers/hooks';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { useIsMobile } from 'helpers/hooks';

import LoginVideo from '_content/videos/frontend/Login.mp4';
import LoginPoster from '_content/videos/frontend/posters/Login.jpg';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import { Link } from 'react-router-dom';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import { pageMeta } from 'constants/frontEnd/meta';
import { componentDidMount } from 'helpers/generic';
import checkPasswordResetTokenValidity from 'actions/shared/auth/async/checkPasswordResetTokenValidity';

const PasswordReset = () => {
    const location = useLocation();
    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery();
    const dispatch = useDispatch();
    const token = query.get('token');
    const isMobile = useIsMobile(1101);

    componentDidMount(() => {
        dispatch(checkPasswordResetTokenValidity(token));
    });

    const { isPosting, postSuccess, error, isFetching } = useSelector(requestStateSelector);

    const [form, handleChange] = useForm({
        password: '',
        confirmPassword: '',
    });

    const isExpired = error?.includes?.('expired');

    return (
        <>
            <PageMeta meta={pageMeta.resetPassword} />
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
                        <FrontEndFormHeading title="Reset Password" classes="smaller" />

                        {postSuccess ? (
                            <p className="generic-text">
                                Password successfully reset. You may now{' '}
                                <Link to="/auth/login">log in</Link>.
                            </p>
                        ) : isFetching ? (
                            <LoadingIcon />
                        ) : !isExpired ? (
                            <Form onSubmit={handleSubmit}>
                                <Field
                                    name="Enter new password"
                                    sizeClasses="size-lg-6"
                                    classes="auth-form-field"
                                    required
                                >
                                    <TextInputContainer
                                        name="password"
                                        value={form.password}
                                        handleChange={handleChange}
                                        placeholder="Password..."
                                        required
                                        type="password"
                                        validate={validatePassword}
                                        classes="auth-text-input-container"
                                        includePasswordStrength
                                    />
                                </Field>
                                <Field
                                    name="Confirm password"
                                    sizeClasses="size-lg-6"
                                    classes="auth-form-field"
                                    required
                                >
                                    <TextInputContainer
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        handleChange={handleChange}
                                        placeholder="Confirm password..."
                                        required
                                        validate={validateConfirmPassword}
                                        classes="auth-text-input-container"
                                        type="password"
                                    />
                                </Field>
                                <Field classes="auth-form-field row right">
                                    <FrontEndButton
                                        classes={`gray right ${!isPosting ? '' : 'disabled'}`}
                                        type="submit"
                                        disabled={isPosting}
                                    >
                                        {!isPosting ? 'Submit' : <LoadingIcon />}
                                    </FrontEndButton>
                                </Field>
                                {!!error && (
                                    <p
                                        className="auth-form-field generic-text field-validation-error"
                                        style={{ marginBottom: '10px', color: 'red' }}
                                    >
                                        {!isExpired && (
                                            <span>
                                                Something went wrong. Please try submitting the
                                                password reset request again. If this issue
                                                persists, please contact Bolster Systems.
                                            </span>
                                        )}
                                    </p>
                                )}
                            </Form>
                        ) : (
                            <p
                                className="generic-text"
                                style={{ marginBottom: '10px', color: 'red' }}
                            >
                                This reset password link has expired, please re-submit{' '}
                                <a href="/auth/login?showForgotPassword=true">here</a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

    function validatePassword(password) {
        const { confirmPassword } = form;
        if (password !== confirmPassword) {
            dispatch(addFieldError('confirmPassword', 'Passwords do not match'));
        } else {
            dispatch(removeFieldError('confirmPassword'));
        }
        return null;
    }

    function validateConfirmPassword(confirmPassword) {
        const { password } = form;

        return password !== confirmPassword
            ? 'Passwords do not match'
            : dispatch(removeFieldError('confirmPassword'));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!isPosting) {
            dispatch(postPasswordReset({ token, password: form.password }));
        }
    }
};

const requestStateSelector = ({
    frontEnd: {
        authReducer: { isPosting, isFetching, postSuccess, error },
    },
}) => ({ isPosting, isFetching, postSuccess, error });

export default PasswordReset;
