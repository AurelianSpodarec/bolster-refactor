import React from 'react';
import { connect } from 'react-redux';
import { showModal } from 'actions/generic/modals/sync/showModal';
import { EDIT_USER_PASSWORD } from 'constants/modalTypes';
import UserListItem from '../presentational/UserListItem';

const UserListItemContainer = ({ user, colCount, showModal }) => {
    const handleShowModal = user => {
        showModal(EDIT_USER_PASSWORD, user);
    };
    return (
        <UserListItem
            user={user}
            colCount={colCount}
            handleShowModal={handleShowModal}
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
