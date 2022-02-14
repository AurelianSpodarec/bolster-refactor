import React from 'react';
import postConfirmEmail from 'actions/shared/auth/async/postConfirmEmail';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import { componentDidMount } from 'helpers/generic';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const ConfirmEmailAddress = () => {
    const { emailConfirmationCode } = useParams();
    const { isPosting, postSuccess, error } = useSelector(requestStateSelector);
    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery();
    const fromRegisterQuery = query.get('fromRegister');
    const isFromRegister = fromRegisterQuery === 'true';

    const dispatch = useDispatch();
    componentDidMount(() => {
        dispatch(postConfirmEmail({ emailConfirmationCode }));
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
                        {!isFromRegister
                            ? 'Thank you for confirming your email address. You can now login to Bolster Systems.'
                            : `Thank you for confirming your email address. You can now login to complete
                        your registration by purchasing your required services and drawing credits.`}
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

export default ConfirmEmailAddress;
