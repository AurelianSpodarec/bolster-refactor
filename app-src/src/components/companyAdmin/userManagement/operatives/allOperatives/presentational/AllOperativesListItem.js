import React from 'react';
import { Link } from 'react-router-dom';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AllOperativesListItem = ({ user, showDeleteModal }) => (
    <tr key={user.id}>
        <td>{`${user.userFirstName} ${user.userLastName}`}</td>
        <td>{user.userEmail}</td>
        <td>{user.userPhoneNumber}</td>
        <td>
            <BlockButtonWrapper>
                <button
                    className="button red"
                    onClick={() => showDeleteModal(user.id)}
                >
                    <i className="fa fa-trash" />
                    Delete User
                </button>
                <Link
                    className="button"
                    to={`/users-management/operatives/${user.id}/edit`}
                >
                    Edit
                </Link>
                <Link
                    className="button"
                    to={`/users-management/operatives/${user.id}/edit`}
                >
                    Edit
                </Link>
                <Link
                    className="button"
                    to={`/users-management/operatives/${user.id}/edit-password`}
                >
                    Change Password
                </Link>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default AllOperativesListItem;
