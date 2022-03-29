import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    EDIT_USER_PASSWORD,
    EDIT_USER,
    CONFIRM_SUBMIT,
    EDIT_USER_EMAIL,
} from 'constants/shared/modalTypes';
import UserListItem from '../presentational/UserListItem';
import forceConfirmUserEmail from 'actions/superAdmin/users/async/forceConfirmUserEmail';
import removeUserLockout from 'actions/superAdmin/users/async/removeUserLockout.js';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const UserListItemContainer = ({ user }) => {
    const dispatch = useDispatch();
    const showConfirmEmailModal = () => {
        const handleSubmit = () => {
            dispatch(forceConfirmUserEmail(user.id)).then(() => dispatch(hideModal()));
        };

        dispatch(
            showModal(CONFIRM_SUBMIT, {
                handleSubmit,
                hideModal: () => dispatch(hideModal()),
                message: "Are you sure you want to force confirm this user's e-mail address?",
            }),
        );
    };
    const showRemoveLockoutModal = () => {
        const handleSubmit = () => {
            dispatch(removeUserLockout(user.id)).then(() => dispatch(hideModal()));
        };

        dispatch(
            showModal(CONFIRM_SUBMIT, {
                handleSubmit,
                hideModal: () => dispatch(hideModal()),
                message: "Are you sure you want to reset this user's lockout?",
            }),
        );
    };

    const showEditUserModal = user => dispatch(showModal(EDIT_USER, user));
    const showEditPasswordModal = user => dispatch(showModal(EDIT_USER_PASSWORD, user));
    const showEditUserEmailModal = user => dispatch(showModal(EDIT_USER_EMAIL, { user }));

    return (
        <UserListItem
            user={user}
            handleShowEditUserModal={showEditUserModal}
            handleShowEditUserPasswordModal={showEditPasswordModal}
            handleShowConfirmEmailModal={showConfirmEmailModal}
            handleShowRemoveLockoutModal={showRemoveLockoutModal}
            handleShowEditUserEmailModal={showEditUserEmailModal}
        />
    );
};

export default React.memo(UserListItemContainer);
