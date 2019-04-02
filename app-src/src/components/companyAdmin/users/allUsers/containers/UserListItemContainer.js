import React from 'react';
import { connect } from 'react-redux';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { EDIT_USER_PASSWORD, EDIT_USER } from 'constants/shared/modalTypes';
import UserListItem from '../presentational/UserListItem';

const UserListItemContainer = ({ user, showModal }) => {
    const handleShowEditUserPasswordModal = user => {
        showModal(EDIT_USER_PASSWORD, user);
    };
    const handleShowEditUserModal = user => {
        showModal(EDIT_USER, user);
    };
    return (
        <UserListItem
            user={user}
            handleShowEditUserModal={handleShowEditUserModal}
            handleShowEditUserPasswordModal={handleShowEditUserPasswordModal}
        />
    );
};

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(UserListItemContainer);
