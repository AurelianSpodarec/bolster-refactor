import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AllOperativesListItem from '../presentational/AllOperativesListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    DELETE_COMPANY_USER,
    UNLINK_DEVICE,
    CONFIRM_SUBMIT,
    DISABLE_USER,
    ENABLE_USER,
} from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import editCompanyUserType from 'actions/companyAdmin/userManagement/async/editCompanyUserType';

const AllOperativesListItemContainer = ({ user, headers, onMobile }) => {
    const dispatch = useDispatch();
    const { disabledUsers, maxDrawingsPerOperative } = useSelector(mapStateToProps);

    const drawingLimitColour = getOperativeDrawingLimitColour(user.drawingCount);
    const drawingLimitMaxed = user.drawingCount >= maxDrawingsPerOperative;

    return (
        <AllOperativesListItem
            user={user}
            drawingLimitColour={drawingLimitColour}
            drawingLimitMaxed={drawingLimitMaxed}
            showDeleteModal={() => dispatch(showModal(DELETE_COMPANY_USER, { id: user.id, user }))}
            showDisableModal={showDisableUserModal}
            showEnableModal={showEnableUserModal}
            showUnlinkModal={unlinkModal}
            showMakeAdminModal={makeAdminModal}
            headers={headers}
            onMobile={onMobile}
            showNotUpsyncedRecentlyWarning={user.notUpsyncedRecently}
            tooltipDate={user.notUpSyncedInXDays}
            isDisabled={!!disabledUsers[user.id]}
        />
    );

    function unlinkModal() {
        dispatch(
            showModal(UNLINK_DEVICE, {
                hideModal: () => dispatch(hideModal()),
                user,
                message: `Are you sure you want to unlink ${user.userFirstName} ${user.userLastName}'s device?`,
            }),
        );
    }

    function makeAdminModal() {
        const handleSubmit = () => {
            dispatch(editCompanyUserType(user.id, { type: 'Admin' }));
            dispatch(hideModal());
        };
        dispatch(
            showModal(CONFIRM_SUBMIT, {
                hideModal: () => dispatch(hideModal()),
                user,
                message: `Are you sure you want to make ${user.userFirstName} ${user.userLastName} an admin?`,
                handleSubmit,
            }),
        );
    }

    function showDisableUserModal() {
        dispatch(showModal(DISABLE_USER, { user }));
    }

    function showEnableUserModal() {
        dispatch(showModal(ENABLE_USER, { user }));
    }

    function getOperativeDrawingLimitColour(numberOfAttachedDrawings) {
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
        inactiveCompanyUsersReducer: { disabled },
    },
}) => ({
    disabledUsers: disabled,
    maxDrawingsPerOperative,
});

export default AllOperativesListItemContainer;
