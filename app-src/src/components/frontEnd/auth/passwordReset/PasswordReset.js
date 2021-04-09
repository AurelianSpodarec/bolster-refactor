import postPasswordReset from 'actions/shared/auth/async/postPasswordReset';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
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

const PasswordReset = () => {
    const location = useLocation();
    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery();
    const dispatch = useDispatch();
    const token = query.get('token');

    const { isPosting, postSuccess, error } = useSelector(requestStateSelector);

    const [form, handleChange] = useForm({
        password: '',
        confirmPassword: '',
    });

    return (
        <div
            className="auth-form-wrapper"
            style={{ textAlign: 'center', display: 'flex', width: '100%', height: '80vh' }}
        >
            <FrontEndFormHeading title="Reset password" classes="smaller" />
            <Field classes="auth-form-field">
                {postSuccess ? (
                    <p>Password successfully reset. You may not log in.</p>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Field name="Enter new password" sizeClasses="size-lg-6" required>
                            <TextInputContainer
                                name="password"
                                value={form.password}
                                handleChange={handleChange}
                                placeholder="Password..."
                                required
                                type="password"
                                validate={validatePassword}
                                includePasswordStrength
                            />
                        </Field>
                        <Field name="Confirm password" sizeClasses="size-lg-6" required>
                            <TextInputContainer
                                name="confirmPassword"
                                value={form.confirmPassword}
                                handleChange={handleChange}
                                placeholder="Confirm password..."
                                required
                                validate={validateConfirmPassword}
                                type="password"
                            />
                        </Field>
                        <Field>
                            <div className="size-lg-12 center-aligned">
                                <span style={{ display: 'inline-block' }}>
                                    <FrontEndButton type="submit" disabled={isPosting}>
                                        Submit
                                    </FrontEndButton>
                                </span>
                            </div>
                        </Field>
                    </Form>
                )}
                {!!error && (
                    <p>
                        Something went wrong. Please again. If this persists, contact Bolster
                        support. ({error})
                    </p>
                )}
            </Field>
        </div>
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
        authReducer: { isPosting, postSuccess, error },
    },
}) => ({ isPosting, postSuccess, error });

export default PasswordReset;
