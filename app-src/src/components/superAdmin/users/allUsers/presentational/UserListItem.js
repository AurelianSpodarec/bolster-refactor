import React from 'react';

import Roles from './Roles';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { Link } from 'react-router-dom';
import { boolToYesNo } from 'helpers/generic';

const UserListItem = ({
    user,
    handleShowEditUserModal,
    handleShowEditUserPasswordModal,
    handleShowConfirmEmailModal,
    handleShowRemoveLockoutModal,
}) => (
    <tr>
        <td>{`${user.firstName} ${user.lastName}`}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <Roles user={user} roles={user.roles} />

        <td>
            {user.clientAccessCreatedByCompanies.length ? (
                user.clientAccessCreatedByCompanies.map((company, i, arr) => {
                    const isTheLastCompany = arr.length - 1 === i;
                    return (
                        <>
                            <Link
                                key={company.companyID}
                                className="link"
                                to={`/admin/companies/${company.companyID}`}
                            >
                                {company.name}
                            </Link>
                            {!isTheLastCompany && <span>, </span>}
                        </>
                    );
                })
            ) : (
                <span>N/A</span>
            )}
        </td>
        <td>
            <DateTimeContainer date={user.createdOn} datetime={DATE_TIME_IDS.DATE} />
        </td>
        <td>{boolToYesNo(user.isEmailConfirmed)}</td>
        <td>{boolToYesNo(user.isDeleted)}</td>
        <td>
            <BlockButtonWrapper>
                <button className="button yellow" onClick={() => handleShowEditUserModal(user)}>
                    <i className="far fa-pencil" /> Edit
                </button>
                {!user.isEmailConfirmed && (
                    <button
                        className="button blue"
                        onClick={() => handleShowConfirmEmailModal(user)}
                    >
                        <i className="far fa-pencil" /> Confirm e-mail
                    </button>
                )}
                {user.isLockoutEnabled && (
                    <button className="button blue" onClick={handleShowRemoveLockoutModal}>
                        <i className="far fa-lock" /> Remove lockout
                    </button>
                )}
                <button onClick={() => handleShowEditUserPasswordModal(user)} className="button">
                    Change password
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default UserListItem;
