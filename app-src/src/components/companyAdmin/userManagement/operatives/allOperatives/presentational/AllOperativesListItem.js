import React from 'react';
import { Link } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const AllOperativesListItem = ({
    user,
    showDeleteModal,
    showUnlinkModal,
    showMakeAdminModal
}) => (
    <tr key={user.id}>
        <td>{`${user.userFirstName} ${user.userLastName}`}</td>
        <td>{user.userEmail}</td>
        <td>{user.userPhoneNumber}</td>
        <td>{user.linkedDeviceID ? 'Yes' : 'No'}</td>
        <td>{user.formattedOperativeCode}</td>
        <td>
            <BlockButtonWrapper additionalClasses="stacked">
                {user.linkedDeviceID && (
                    <button className="button blue" onClick={showUnlinkModal}>
                        <i className="far fa-unlink" />
                        Unlink Device
                    </button>
                )}
                <Link
                    className="button green"
                    to={`/company/users-management/operatives/${
                        user.id
                    }/edit-password`}
                >
                    <i className="far fa-lock-alt fa-fw" />
                    Change Password
                </Link>
                <ButtonContainer
                    className="button yellow"
                    handleClick={showMakeAdminModal}
                >
                    <i className="far fa-user" /> Make Admin
                </ButtonContainer>
                <Link
                    className="button yellow"
                    to={`/company/users-management/operatives/${user.id}/edit`}
                >
                    <i className="far fa-pencil" /> Edit
                </Link>
                <button className="button red" onClick={showDeleteModal}>
                    <i className="far fa-trash-alt" />
                    Delete
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default AllOperativesListItem;
