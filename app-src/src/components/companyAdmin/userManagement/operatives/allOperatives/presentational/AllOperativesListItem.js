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
                    <i className="far fa-trash-alt" />
                    Delete
                </button>
                <Link
                    className="button yellow"
                    to={`/company/users-management/operatives/${user.id}/edit`}
                >
                    <i className="far fa-pencil" /> Edit
                </Link>
                <Link
                    className="button"
                    to={`/company/users-management/operatives/${
                        user.id
                    }/edit-password`}
                >
                    Change Password
                </Link>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default AllOperativesListItem;
