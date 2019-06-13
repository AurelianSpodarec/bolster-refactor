import React from 'react';

const AllClientsListItem = ({ user }) => (
    <tr key={user.id}>
        <td>{`${user.userFirstName} ${user.userLastName}`}</td>
        <td />
    </tr>
);

export default AllClientsListItem;
