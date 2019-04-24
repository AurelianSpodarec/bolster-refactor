import React from 'react';
import { connect } from 'react-redux';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { EDIT_USER_PASSWORD, EDIT_USER } from 'constants/shared/modalTypes';
import UserListItem from '../presentational/UserListItem';

const UserListItemContainer = ({
    user,
    showEditUserModal,
    ShowEditPasswordModal
}) => (
    <UserListItem
        user={user}
        handleShowEditUserModal={showEditUserModal}
        handleShowEditUserPasswordModal={ShowEditPasswordModal}
    />
);

const mapDispatchToProps = dispatch => ({
    showEditUserModal: user => dispatch(showModal(EDIT_USER, user)),
    ShowEditPasswordModal: user => dispatch(showModal(EDIT_USER_PASSWORD, user))
});

export default connect(
    null,
    mapDispatchToProps
)(UserListItemContainer);
