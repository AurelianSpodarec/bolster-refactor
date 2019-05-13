import React from 'react';
import { connect } from 'react-redux';

import AllOperativesListItem from '../presentational/AllOperativesListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    DELETE_COMPANY_USER,
    CONFIRM_DELETE
} from 'constants/shared/modalTypes';
import unlinkOperativeDevice from 'actions/companyAdmin/userManagement/async/unlinkOperativeDevice';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const AllOperativesListItemContainer = ({
    user,
    colCount,
    showModal,
    unlinkDevice,
    hideModal
}) => (
    <AllOperativesListItem
        user={user}
        colCount={colCount}
        showDeleteModal={() => showModal(DELETE_COMPANY_USER, { id: user.id })}
        showUnlinkModal={() =>
            showModal(CONFIRM_DELETE, {
                hideModal,
                handleDelete: () => unlinkDevice(user.id),
                message: `Are you sure you want to unlink ${
                    user.userFirstName
                } ${user.userLastName}'s device?`,
                deleteButtonText: 'Unlink',
                icon: 'unlink'
            })
        }
    />
);

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal()),
    unlinkDevice: id => dispatch(unlinkOperativeDevice(id))
});

export default connect(
    null,
    mapDispatchToProps
)(AllOperativesListItemContainer);
