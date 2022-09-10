import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

import RestrictUserPaymentsModal from '../presentational/RestrictUserPaymentsModal';
import toggleRestrictUserPayments from 'actions/companyAdmin/userManagement/async/toggleRestrictUserPayments';
import { usePrevious } from 'helpers/hooks';

const RestrictPaymentsModalContainer = ({ user }) => {
    const dispatch = useDispatch();
    const { postSuccess } = useSelector(mapStateToProps);
    const prevProps = usePrevious({ postSuccess });
    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            setTimeout(function () {
                fetchCompanyUsers();
            }, 750);

            dispatch(hideModal());
        }
    }, [postSuccess, prevProps.postSuccess]);

    const message = user.shouldRestrictPayments
        ? 'Are you sure you want to grant this user permission to use payments?'
        : 'Are you sure you want to restrict payments from this user?';

    return (
        <RestrictUserPaymentsModal
            hideModal={() => dispatch(hideModal())}
            message={message}
            handleRestrict={() =>
                dispatch(
                    toggleRestrictUserPayments({
                        ID: user.id,
                        shouldRestrictPayments: !user.shouldRestrictPayments,
                    }),
                )
            }
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { postSuccess },
    },
}) => ({ postSuccess });

export default RestrictPaymentsModalContainer;
