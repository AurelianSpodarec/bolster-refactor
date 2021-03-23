import React from 'react';

const DeletedCompanyAdminsListItem = ({ user: { userFirstName, userLastName, userEmail } }) => (
    <tr>
        <td>{`${userFirstName} ${userLastName}`}</td>
        <td>{userEmail}</td>
        <td>
            <button className="button grey">Recover</button>
        </td>
    </tr>
);

export default DeletedCompanyAdminsListItem;
