import React from 'react';
import { connect } from 'react-redux';

import AllOperativesListItem from '../presentational/AllOperativesListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    DELETE_COMPANY_USER,
    UNLINK_DEVICE
} from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const AllOperativesListItemContainer = ({
    user,
    colCount,
    showModal,
    hideModal
}) => {
    return (
        <AllOperativesListItem
            user={user}
            colCount={colCount}
            showDeleteModal={() =>
                showModal(DELETE_COMPANY_USER, { id: user.id })
            }
            showUnlinkModal={unlinkModal}
        />
    );

    function unlinkModal() {
        showModal(UNLINK_DEVICE, {
            hideModal,
            user,
            message: `Are you sure you want to unlink ${user.userFirstName} ${
                user.userLastName
            }'s device?`
        });
    }
};

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal())
});

export default connect(
    null,
    mapDispatchToProps
)(AllOperativesListItemContainer);
