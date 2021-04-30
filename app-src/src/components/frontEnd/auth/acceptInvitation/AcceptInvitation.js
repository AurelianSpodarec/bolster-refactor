import postAcceptInvitation from 'actions/shared/auth/async/postAcceptInvitation';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import { authenticate } from 'helpers/api';
import { componentDidMount } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

const AcceptInvitation = () => {
    const history = useHistory();
    const location = useLocation();
    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery();
    const token = query.get('token');

    const { isPosting, postSuccess, error } = useSelector(requestStateSelector);
    const prevProps = usePrevious({ isPosting, postSuccess, error });

    const dispatch = useDispatch();
    componentDidMount(() => {
        dispatch(postAcceptInvitation({ token }));
    });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            handleSuccess();
        }
    }, [isPosting, postSuccess]);

    return (
        <div
            className="auth-form-wrapper"
            style={{ textAlign: 'center', display: 'flex', width: '100%', height: '80vh' }}
        >
            <FrontEndFormHeading title="Accept Invitation" classes="smaller" />
            <Field classes="auth-form-field">
                {isPosting && <Loading />}
                {!!error && (
                    <p>
                        Something went wrong. Please again. If this persists, contact Bolster
                        support. ({error})
                    </p>
                )}
                {!!postSuccess && <p>Your invitation has been accepted, logging in...</p>}
            </Field>
        </div>
    );

    async function handleSuccess() {
        const { isCompanyAdmin, isClientAccess, isSuperAdmin } = await authenticate();
        const isNew = query.get('isNew') === 'true' ? true : false;
        const canAccessCompanyProfile = isCompanyAdmin || isClientAccess || isSuperAdmin;
        if (!canAccessCompanyProfile) {
            if (isNew) return history.replace('/auth/set-password');
            return history.replace('/auth/operative/invitation-accepted');
        }
        if (isNew) {
            return history.replace('/company/profile/change-password');
        }

        return history.replace('/auth/admin/invitation-accepted');
    }
};

const requestStateSelector = ({
    frontEnd: {
        authReducer: { isPosting, postSuccess, error },
    },
}) => ({ isPosting, postSuccess, error });

export default AcceptInvitation;
