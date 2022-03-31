import React, { useEffect, useRef } from 'react';

import UserActionsMenu from '../../../shared/menus/UserActionsMenu';
import { Link } from 'react-router-dom';

const CompanyAdminUserActionsMenu = ({
    onMobile,
    headers,
    user,
    isDisabled,
    showUnlinkModal,
    generateReport,
    showEnableModal,
    showDisableModal,
    showDeleteModal,
    setShowUserActions,
    showMakeAdminModal,
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
                    <div className="action-link" onClick={showUnlinkModal}>
                        Unlink Device
                    </div>
                )}
                <div className="action-link" onClick={generateReport}>
                    Generate Report
                </div>

                {!isDisabled && (
                    <div className="action-link" onClick={showMakeAdminModal}>
                        {' '}
                        Make Admin
                    </div>
                )}
                <Link
                    className="action-link"
                    to={`/company/users-management/operatives/${user.id}/timesheet`}
                >
                    View Timesheet
                </Link>
                <Link
                    className="action-link"
                    to={`/company/users-management/operatives/${user.id}/edit`}
                >
                    Edit
                </Link>
                <Link
                    className="action-link"
                    to={`/company/users-management/operatives/${user.id}/edit-email`}
                >
                    Edit Email
                </Link>
                <Link
                    className="action-link"
                    to={`/company/users-management/operatives/${user.id}/documents`}
                >
                    User Documents
                </Link>
                <Link
                    className="action-link"
                    to={`/company/users-management/operative/${user.id}/drawings`}
                >
                    Drawings Access
                </Link>

                {isDisabled ? (
                    <div className="action-link" onClick={showEnableModal}>
                        Enable
                    </div>
                ) : (
                    <>
                        <div className="action-link" onClick={showDisableModal}>
                            Disable
                        </div>
                        <div className="action-link red" onClick={showDeleteModal}>
                            Delete
                        </div>
                    </>
                )}
            </div>
        </UserActionsMenu>
    );
};

export default CompanyAdminUserActionsMenu;
