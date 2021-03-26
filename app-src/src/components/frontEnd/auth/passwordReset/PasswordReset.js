import postPasswordReset from 'actions/shared/auth/async/postPasswordReset';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

const PasswordReset = () => {
    const location = useLocation();
    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery();
    const dispatch = useDispatch();
    const token = query.get('token');

    const { isPosting, postSuccess, error } = useSelector(requestStateSelector);

    const [password, setPassword] = useState('');

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
                        <Field name="Enter your new password below." required>
                            <TextInputContainer
                                name="password"
                                value={password}
                                handleChange={(_, value) => setPassword(value)}
                                placeholder="Password..."
                                required
                                type="password"
                            />
                        </Field>
                        <ButtonContainer handleClick={handleSubmit}>Submit</ButtonContainer>
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

    function handleSubmit(e) {
        e.preventDefault();
        if (!isPosting) {
            dispatch(postPasswordReset({ token, password }));
        }
    }
};

const requestStateSelector = ({
    frontEnd: {
        authReducer: { isPosting, postSuccess, error },
    },
}) => ({ isPosting, postSuccess, error });

export default PasswordReset;
