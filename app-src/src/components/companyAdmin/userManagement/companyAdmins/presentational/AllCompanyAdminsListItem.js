import React from 'react';
import { Link } from 'react-router-dom';

const AllCompanyAdminsListItem = ({ user }) => {
    return (
        <>
            <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>##permissions##</td>
                <td>
                    <Link className="button" to={`/user-management/${user.id}`}>
                        Edit
                    </Link>
                </td>
            </tr>
        </>
    );
};

export default AllCompanyAdminsListItem;
