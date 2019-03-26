import React from 'react';
import moment from 'moment';

import Roles from './Roles';

const UserListItem = ({
    user,
    handleShowEditUserModal,
    handleShowEditUserPasswordModal
}) => {
    // ! take this out
    const role = Math.round(Math.random())
        ? '##Operative##'
        : '##Company Admin##';

    return (
        <tr>
            <td>{`${user.firstName} ${user.lastName}`}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <Roles roles={user.roles} />
            <td>{moment(user.createdOn).format('DD/MM/YYYY')}</td>
            <td>
                <button
                    className="button"
                    onClick={() => handleShowEditUserModal(user)}
                >
                    edit
                </button>
                <button
                    onClick={() => handleShowEditUserPasswordModal(user)}
                    className="button"
                >
                    change password
                </button>
            </td>
        </tr>
    );
};

export default UserListItem;
