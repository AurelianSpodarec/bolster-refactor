import React from 'react';

const InvitedOperativesListItem = ({ user: { userFirstName, userLastName, userEmail } }) => (
    <tr>
        <td>{`${userFirstName} ${userLastName}`}</td>
        <td>{userEmail}</td>
    </tr>
);

export default InvitedOperativesListItem;
