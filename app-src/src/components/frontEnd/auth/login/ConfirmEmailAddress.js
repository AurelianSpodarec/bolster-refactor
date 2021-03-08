import postConfirmEmail from 'actions/shared/auth/async/postConfirmEmail';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import { componentDidMount } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const ConfirmEmailAddress = () => {
    const { emailConfirmationCode } = useParams();
    const { isPosting, postSuccess, error } = useSelector(requestStateSelector);
    const prevProps = usePrevious({ isPosting, postSuccess, error });

    const dispatch = useDispatch();
    componentDidMount(() => {
        dispatch(postConfirmEmail({ emailConfirmationCode }));
    });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            // todo handle success
        }
        if (error && !prevProps.error) {
            // todo handle error
        }
    }, [isPosting, postSuccess, error]);

    return (
        <div
            className="auth-form-wrapper"
            style={{ textAlign: 'center', display: 'flex', width: '100%', height: '80vh' }}
        >
            <FrontEndFormHeading title="Confirm e-mail" classes="smaller" />
            <Field classes="auth-form-field">
                {isPosting && <Loading />}
                {!!error && <p>Something went wrong. Please try to log in again. ({error})</p>}
                {!!postSuccess && (
                    <p>Your e-mail address has been confirmed, and you can now log in.</p>
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
