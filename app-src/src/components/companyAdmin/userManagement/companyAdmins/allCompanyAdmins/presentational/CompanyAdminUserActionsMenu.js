import React from 'react';
import useClickOutside from '../../../../../../hooks/useClickOutside';

import UserActionsMenu from '../../../shared/menus/UserActionsMenu';
import { Link } from 'react-router-dom';
import { COMPANY_USER_ROLE_TYPES } from '../../../../../../constants/companyAdmin/enums';

const CompanyAdminUserActionsMenu = ({
    onMobile,
    headers,
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
    setShowUserActions,
}) => {
    const closeMenu = () => {
        setShowUserActions(false);
    };

    const ref = useClickOutside(closeMenu);

    return (
        <UserActionsMenu>
            {onMobile && <span className="mobile-table-heading">{headers[10]}</span>}
            <div ref={ref} className="flex-column">
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
                        <div
                            onClick={() => showRestrictUserPaymentsModal(user.id)}
                            className="action-link"
                        >
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
                                <div
                                    onClick={() => showDisableModal(user.id)}
                                    className="action-link"
                                >
                                    Disable
                                </div>
                                <div
                                    onClick={() => showDeleteModal(user.id)}
                                    className="action-link red"
                                >
                                    Delete
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </UserActionsMenu>
    );
};

export default CompanyAdminUserActionsMenu;
