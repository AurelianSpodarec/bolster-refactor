import React from 'react';
import { Link } from 'react-router-dom';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

const AllCompanyAdminsListItem = ({
    user,
    showDeleteModal,
    showUnlinkModal,
    showRevokeAdminAccessModal,
    loggedInUser
}) => (
    <tr key={user.id}>
        <td>
            {`${user.userFirstName} ${user.userLastName}`}{' '}
            {user.type === COMPANY_USER_ROLE_TYPES.OWNER ? (
                <span>(OWNER)</span>
            ) : null}
        </td>
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
                    to={`/company/users-management/company-admins/${
                        user.id
                    }/edit-password`}
                >
                    <i className="far fa-lock-alt fa-fw" />
                    Change password
                </Link>
                <Link
                    className="button yellow "
                    to={`/company/users-management/company-admins/${
                        user.id
                    }/edit`}
                >
                    <i className="far fa-pencil" />
                    Edit
                </Link>
                {loggedInUser.type === +COMPANY_USER_ROLE_TYPES.OWNER &&
                    +user.type !== +COMPANY_USER_ROLE_TYPES.OWNER && (
                        <button
                            className="button"
                            onClick={() => showRevokeAdminAccessModal(user.id)}
                        >
                            <i className="far fa-ban" />
                            Revoke Admin
                        </button>
                    )}
                {+user.type !== +COMPANY_USER_ROLE_TYPES.OWNER ? (
                    <button
                        className="button red"
                        onClick={() => showDeleteModal(user.id)}
                    >
                        <i className="far fa-trash-alt" />
                        Delete
                    </button>
                ) : (
                    <></>
                )}
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default AllCompanyAdminsListItem;
