import React from 'react';
import { Link } from 'react-router-dom';

import { COMPANY_USER_ROLE_TYPES } from '../../../../../../constants/companyAdmin/enums';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';

const CompanyAdminUserActionsMenu = ({
    user,
    isDisabled,
    showUnlinkModal,
    generateReport,
    loggedInUser,
    showRevokeAdminAccessModal,
    showRestrictUserPaymentsModal,
    showEnableModal,
    showDisableModal,
    showDeleteModal,
}) => (
    <ActionMenu>
        <div onClick={generateReport} className="action-link">
            Generate Report
        </div>

        {user.linkedDeviceID && !isDisabled && (
            <div onClick={showUnlinkModal} className="action-link">
                Unlink Device
            </div>
        )}
        <Link
            to={`/company/users-management/company-admins/${user.id}/timesheet`}
            className="action-link"
        >
            Timesheet
        </Link>
        <Link
            to={`/company/users-management/company-admins/${user.id}/edit`}
            className="action-link"
        >
            Edit
        </Link>
        <Link
            to={`/company/users-management/company-admins/${user.id}/edit-email`}
            className="action-link"
        >
            Edit Email
        </Link>
        <Link
            to={`/company/users-management/company-admins/${user.id}/documents`}
            className="action-link"
        >
            Documents
        </Link>

        {loggedInUser.type === +COMPANY_USER_ROLE_TYPES.OWNER &&
            +user.type !== +COMPANY_USER_ROLE_TYPES.OWNER &&
            (user.shouldRestrictPayments ? (
                <div onClick={() => showRestrictUserPaymentsModal(user.id)} className="action-link">
                    Enable Payments
                </div>
            ) : !isDisabled ? (
                <>
                    <div
                        onClick={() => showRevokeAdminAccessModal(user.id)}
                        className="action-link"
                    >
                        Revoke Admin
                    </div>
                    <div
                        onClick={() => showRestrictUserPaymentsModal(user.id)}
                        className="action-link"
                    >
                        Restrict Payments
                    </div>
                </>
            ) : (
                <></>
            ))}

        {+user.type !== +COMPANY_USER_ROLE_TYPES.OWNER && (
            <>
                {isDisabled ? (
                    <div onClick={() => showEnableModal(user.id)} className="action-link">
                        Enable
                    </div>
                ) : (
                    <>
                        <div onClick={() => showDisableModal(user.id)} className="action-link">
                            Disable
                        </div>
                        <div onClick={() => showDeleteModal(user.id)} className="action-link red">
                            Delete
                        </div>
                    </>
                )}
            </>
        )}
    </ActionMenu>
);

export default CompanyAdminUserActionsMenu;
