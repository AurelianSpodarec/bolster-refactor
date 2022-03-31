import React, { useEffect, useRef } from 'react';

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
    const menuRef = useRef(null);

    const handleClickOutside = event => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowUserActions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <UserActionsMenu>
            {onMobile && <span className="mobile-table-heading">{headers[10]}</span>}
            <div ref={menuRef} className="flex-column">
                {user.linkedDeviceID && !isDisabled && (
                    <div onClick={showUnlinkModal} className="action-link">
                        Unlink Device
                    </div>
                )}
                <div onClick={generateReport} className="action-link">
                    Generate Report
                </div>
                <Link
                    to={`/company/users-management/company-admins/${user.id}/timesheet`}
                    className="action-link"
                >
                    View Timesheet
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
                    User Documents
                </Link>
                {loggedInUser.type === +COMPANY_USER_ROLE_TYPES.OWNER &&
                    +user.type !== +COMPANY_USER_ROLE_TYPES.OWNER &&
                    !isDisabled && (
                        <div
                            onClick={() => showRevokeAdminAccessModal(user.id)}
                            className="action-link"
                        >
                            Revoke Admin
                        </div>
                    )}
                {loggedInUser.type === +COMPANY_USER_ROLE_TYPES.OWNER &&
                    +user.type !== +COMPANY_USER_ROLE_TYPES.OWNER &&
                    (user.shouldRestrictPayments ? (
                        <div
                            onClick={() => showRestrictUserPaymentsModal(user.id)}
                            className="action-link"
                        >
                            Enable Payments
                        </div>
                    ) : isDisabled ? (
                        <></>
                    ) : (
                        <div
                            onClick={() => showRestrictUserPaymentsModal(user.id)}
                            className="action-link"
                        >
                            Restrict Payments
                        </div>
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
