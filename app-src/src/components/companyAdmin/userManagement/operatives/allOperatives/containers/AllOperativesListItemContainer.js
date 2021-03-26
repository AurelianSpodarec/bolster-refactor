import React from 'react';
import { useDispatch } from 'react-redux';

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

    // todo check this when drawings count is done
    const drawingLimitColour = getOperativeDrawingLimitColour(user.numberOfAttachedDrawings);
    return (
        <AllOperativesListItem
            user={user}
            drawingLimitColour={drawingLimitColour}
            showDeleteModal={() => dispatch(showModal(DELETE_COMPANY_USER, { id: user.id, user }))}
            showDisableModal={showDisableUserModal}
            showEnableModal={showEnableUserModal}
            showUnlinkModal={unlinkModal}
            showMakeAdminModal={makeAdminModal}
            headers={headers}
            onMobile={onMobile}
            showNotUpsyncedRecentlyWarning={user.notUpsyncedRecently}
            tooltipDate={user.notUpSyncedInXDays}
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
        if (numberOfAttachedDrawings <= 6) return 'green';
        if (numberOfAttachedDrawings <= 12) return 'yellow';
        if (numberOfAttachedDrawings <= 18) return 'orange';
        return 'red';
    }
};

export default AllOperativesListItemContainer;
