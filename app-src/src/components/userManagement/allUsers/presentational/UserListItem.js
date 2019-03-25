import React from 'react';
import moment from 'moment';

const UserListItem = ({ user }) => {
    return (
        <tr>
            <td>{`${user.firstName} ${user.lastName}`}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{moment(user.createdOn).format('DD/MM/YYYY')}</td>
            <td>
                <button className="button">edit</button>
                <button className="button">change password</button>
            </td>
        </tr>
    );
};

export default UserListItem;
