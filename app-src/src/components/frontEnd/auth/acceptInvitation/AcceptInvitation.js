import postAcceptInvitation from 'actions/shared/auth/async/postAcceptInvitation';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import { pageMeta } from 'constants/frontEnd/meta';
import { authenticate } from 'helpers/api';
import { componentDidMount } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

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
            <PageMeta meta={pageMeta.acceptInvitation} />
            <FrontEndFormHeading title="Accept Invitation" classes="smaller" />
            {isPosting && <Loading />}
            {!!error && (
                <div
                    className="size-lg-12"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        height: '50%',
                    }}
                >
                    <p style={{ fontSize: '1.5em', marginBottom: '1em' }}>
                        Something went wrong. Please try again. If this persists, contact Bolster
                        support. ({error})
                    </p>
                    <br />
                    <p style={{ fontSize: '1.5em', marginBottom: '1em' }}>
                        If you've already accepted this invitation but not set up your login
                        credentials, please reset your password below
                    </p>
                    <Link className="button red" to="/auth/login?showForgotPassword=true">
                        Reset password
                    </Link>
                </div>
            )}
            {!!postSuccess && <p>Your invitation has been accepted, logging in...</p>}
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
            if (isCompanyAdmin || isSuperAdmin) {
                return history.replace('/company/profile/change-password');
            }
            return history.replace('/client/profile/change-password');
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
