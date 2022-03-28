import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import { componentDidMount } from 'helpers/generic';
import postConfirmChangeEmail from 'actions/shared/auth/async/postConfirmChangeEmail';

const ConfirmChangeEmail = () => {
    const { token } = useParams();

    const { isPosting, postSuccess, error } = useSelector(requestStateSelector);

    const dispatch = useDispatch();
    componentDidMount(() => {
        dispatch(postConfirmChangeEmail(token));
    });
    return (
        <div
            className="auth-form-wrapper"
            style={{ textAlign: 'center', display: 'flex', width: '100%', height: '80vh' }}
        >
            <FrontEndFormHeading title="Confirm e-mail" classes="smaller" />
            <Field classes="auth-form-field">
                {isPosting && (
                    <div className="loading-text size-lg-12">
                        <p>Loading</p>
                        <LoadingIcon />
                    </div>
                )}
                {!!error && <p className="generic-text">Something went wrong. ({error})</p>}
                {!!postSuccess && (
                    <p className="generic-text">
                        Thank you for confirming your new email address. You can now log in with
                        your new email address.
                    </p>
                )}
            </Field>
        </div>
    );
};

const requestStateSelector = ({
    frontEnd: {
        authReducer: { isPosting, postSuccess, error },
    },
}) => ({ isPosting, postSuccess, error });

export default React.memo(ConfirmChangeEmail);
