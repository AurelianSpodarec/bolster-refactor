import React from 'react';
import { Link } from 'react-router-dom';

const AllOperativesListItem = ({ user }) => {
    return (
        <tr key={user.id}>
            <td>{`${user.userFirstName} ${user.userLastName}`}</td>
            <td>{user.userEmail}</td>
            <td>{user.userPhoneNumber}</td>
            <td>
                <Link
                    className="button"
                    to={`/user-management/operatives/${user.id}/edit`}
                >
                    Edit
                </Link>
            </td>
        </tr>
    );
};

export default AllOperativesListItem;
