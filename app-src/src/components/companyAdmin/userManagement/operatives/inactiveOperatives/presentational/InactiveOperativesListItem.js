import React from 'react';

const InactiveOperativesListItem = ({ user: { userFirstName, userLastName, userEmail } }) => (
    <tr>
        <td>{`${userFirstName} ${userLastName}`}</td>
        <td>{userEmail}</td>
        <td>
            <button className="button grey">Request reactivation</button>
        </td>
    </tr>
);

export default InactiveOperativesListItem;
