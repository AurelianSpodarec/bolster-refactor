import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    DELETE_COMPANY_USER,
    UNLINK_DEVICE,
    REVOKE_ADMIN_ACCESS,
    RESTRICT_ADMIN_PAYMENTS,
} from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AllCompanyAdminsListItem from '../presentational/AllCompanyAdminsListItem';

const AllCompanyAdminsListItemContainer = ({ user, colCount, headers }) => {
    const { loggedInUser, onMobile } = useSelector(mapStateToProps);
    const dispatch = useDispatch();

    return (
        <AllCompanyAdminsListItem
            user={user}
            colCount={colCount}
            showDeleteModal={deleteModal}
            showDisableModal={showDisableUserModal}
            showUnlinkModal={unlinkModal}
            showRestrictUserPaymentsModal={showRestrictUserPaymentsModal}
            showRevokeAdminAccessModal={revokeAdminAccess}
            loggedInUser={loggedInUser}
            headers={headers}
            onMobile={onMobile}
            showNotUpsyncedRecentlyWarning={user.notUpsyncedRecently}
            tooltipDate={user.notUpSyncedInXDays}
        />
    );

    function deleteModal() {
        const { user, showModal } = this.props;

        dispatch(showModal(DELETE_COMPANY_USER, { id: user.id }));
    }

    function unlinkModal() {
        dispatch(
            showModal(UNLINK_DEVICE, {
                hideModal: () => dispatch(hideModal()),
                user,
                message: `Are you sure you want to unlink ${user.userFirstName} ${user.userLastName}'s device?`,
            }),
        );
    }

    function revokeAdminAccess() {
        dispatch(
            showModal(REVOKE_ADMIN_ACCESS, {
                hideModal: () => dispatch(hideModal()),
                user,
                message: `Are you sure you want to revoke the admin access for ${user.userFirstName} ${user.userLastName}?`,
            }),
        );
    }
    function showRestrictUserPaymentsModal() {
        dispatch(
            showModal(RESTRICT_ADMIN_PAYMENTS, {
                hideModal: () => dispatch(hideModal()),
                user,
            }),
        );
    }

    function showDisableUserModal(userID) {
        // todo
    }
};

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users },
    },
    shared: {
        decodeJWTReducer: { jwtData },
        mobileReducer: { onMobile },
    },
}) => ({
    loggedInUser: users[jwtData.companyUserID] || { type: null },
    onMobile,
});

export default AllCompanyAdminsListItemContainer;
