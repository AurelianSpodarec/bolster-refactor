import React from 'react';
import { connect } from 'react-redux';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { EDIT_USER_PASSWORD, EDIT_USER } from 'constants/shared/modalTypes';
import UserListItem from '../presentational/UserListItem';

const UserListItemContainer = ({
    user,
    showEditUserModal,
    showEditPasswordModal
}) => (
    <UserListItem
        user={user}
        handleShowEditUserModal={showEditUserModal}
        handleShowEditUserPasswordModal={showEditPasswordModal}
    />
);

const mapDispatchToProps = dispatch => ({
    showEditUserModal: user => dispatch(showModal(EDIT_USER, user)),
    showEditPasswordModal: user => dispatch(showModal(EDIT_USER_PASSWORD, user))
});

export default connect(
    null,
    mapDispatchToProps
)(UserListItemContainer);
