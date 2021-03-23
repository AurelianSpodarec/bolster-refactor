import React from 'react';

const DeletedCompanyAdminsListItem = ({ user: { userFirstName, userLastName, userEmail } }) => (
    <tr>
        <td>{`${userFirstName} ${userLastName}`}</td>
        <td>{userEmail}</td>
        <td></td>
    </tr>
);

export default DeletedCompanyAdminsListItem;
