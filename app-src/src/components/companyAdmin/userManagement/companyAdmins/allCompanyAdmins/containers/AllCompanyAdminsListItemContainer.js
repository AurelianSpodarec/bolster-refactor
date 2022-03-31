import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    DELETE_COMPANY_USER,
    UNLINK_DEVICE,
    REVOKE_ADMIN_ACCESS,
    RESTRICT_ADMIN_PAYMENTS,
    DISABLE_USER,
    ENABLE_USER,
} from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AllCompanyAdminsListItem from '../presentational/AllCompanyAdminsListItem';

const AllCompanyAdminsListItemContainer = ({ user, headers }) => {
    const { loggedInUser, onMobile, disabledUsers, maxDrawingsPerOperative } =
        useSelector(mapStateToProps);
    const [showUserActions, setShowUserActions] = useState(false);

    const dispatch = useDispatch();

    const drawingLimitColour = getCompanyAdminDrawingLimitColour(user.drawingCount);
    const drawingLimitMaxed = user.drawingCount >= maxDrawingsPerOperative;

    return (
        <AllCompanyAdminsListItem
            user={user}
            colCount={headers.length}
            showDeleteModal={deleteModal}
            showDisableModal={showDisableUserModal}
            showEnableModal={showEnableUserModal}
            showUnlinkModal={unlinkModal}
            showRestrictUserPaymentsModal={showRestrictUserPaymentsModal}
            showRevokeAdminAccessModal={revokeAdminAccess}
            loggedInUser={loggedInUser}
            headers={headers}
            onMobile={onMobile}
            showNotUpsyncedRecentlyWarning={user.notUpsyncedRecently}
            tooltipDate={user.notUpSyncedInXDays}
            isDisabled={!!disabledUsers[user.id]}
            drawingLimitColour={drawingLimitColour}
            drawingLimitMaxed={drawingLimitMaxed}
            showUserActions={showUserActions}
            setShowUserActions={setShowUserActions}
        />
    );

    function deleteModal() {
        dispatch(showModal(DELETE_COMPANY_USER, { id: user.id, user }));
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

    function showDisableUserModal() {
        dispatch(showModal(DISABLE_USER, { user }));
    }

    function showEnableUserModal() {
        dispatch(showModal(ENABLE_USER, { user }));
    }

    function getCompanyAdminDrawingLimitColour(numberOfAttachedDrawings) {
        const diff = numberOfAttachedDrawings / maxDrawingsPerOperative;

        if (isNaN(diff)) return '';
        if (diff <= 0.25) return 'green';
        if (diff <= 0.5) return 'yellow';
        if (diff <= 0.75) return 'orange';
        return 'red';
    }
};

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { maxDrawingsPerOperative },
        },
        companyUsersReducer: { users },
        inactiveCompanyUsersReducer: { disabled },
    },
    shared: {
        decodeJWTReducer: { jwtData },
        mobileReducer: { onMobile },
    },
}) => ({
    loggedInUser: users[jwtData.companyUserID] || { type: null },
    onMobile,
    disabledUsers: disabled,
    maxDrawingsPerOperative,
});

export default AllCompanyAdminsListItemContainer;
