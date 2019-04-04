import React from 'react';
import { Link } from 'react-router-dom';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AllCompanyAdminsListItem = ({ user, showDeleteModal }) => {
    return (
        <tr key={user.id}>
            <td>{`${user.userFirstName} ${user.userLastName}`}</td>
            <td>{user.userEmail}</td>
            <td>{user.userPhoneNumber}</td>
            <td>
                <BlockButtonWrapper>
                    <Link
                        className="button"
                        to={`/user-management/company-admins/${user.id}`}
                    >
                        Edit
                    </Link>
                    <button
                        className="button"
                        onClick={() => showDeleteModal(user.id)}
                    >
                        Delete User
                    </button>
                </BlockButtonWrapper>
            </td>
        </tr>
    );
};

export default AllCompanyAdminsListItem;
