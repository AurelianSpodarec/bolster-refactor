import React from 'react';
import { Link } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const AllOperativesListItem = ({ user, showDeleteModal, showUnlinkModal }) => (
    <tr key={user.id}>
        <td>{`${user.userFirstName} ${user.userLastName}`}</td>
        <td>{user.userEmail}</td>
        <td>{user.userPhoneNumber}</td>
        <td>{user.linkedDeviceID ? 'Yes' : 'No'}</td>
        <td>
            <BlockButtonWrapper>
                <button className="button red" onClick={showDeleteModal}>
                    <i className="far fa-trash-alt" />
                    Delete
                </button>
                <Link
                    className="button yellow"
                    to={`/company/users-management/operatives/${user.id}/edit`}
                >
                    <i className="far fa-pencil" /> Edit
                </Link>
                <ButtonContainer
                    to={`/company/users-management/operatives/${
                        user.id
                    }/edit-password`}
                >
                    Change Password
                </ButtonContainer>
                {user.linkedDeviceID && (
                    <button className="button red" onClick={showUnlinkModal}>
                        <i className="far fa-unlink" />
                        Unlink Device
                    </button>
                )}
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default AllOperativesListItem;
