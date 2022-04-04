import React from 'react';
import { Link } from 'react-router-dom';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';

const CompanyAdminUserActionsMenu = ({
    user,
    isDisabled,
    showUnlinkModal,
    generateReport,
    showEnableModal,
    showDisableModal,
    showDeleteModal,
    showMakeAdminModal,
}) => (
    <ActionMenu>
        <div className="action-link" onClick={generateReport}>
            Generate Report
        </div>

        {user.linkedDeviceID && !isDisabled && (
            <div className="action-link" onClick={showUnlinkModal}>
                Unlink Device
            </div>
        )}

        <Link
            className="action-link"
            to={`/company/users-management/operatives/${user.id}/timesheet`}
        >
            Timesheet
        </Link>
        <Link className="action-link" to={`/company/users-management/operatives/${user.id}/edit`}>
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
            Documents
        </Link>

        {isDisabled ? (
            <div className="action-link" onClick={showEnableModal}>
                Enable
            </div>
        ) : (
            <>
                <div className="action-link" onClick={showMakeAdminModal}>
                    Make Admin
                </div>
                <div className="action-link" onClick={showDisableModal}>
                    Disable
                </div>
                <div className="action-link red" onClick={showDeleteModal}>
                    Delete
                </div>
            </>
        )}
    </ActionMenu>
);

export default CompanyAdminUserActionsMenu;
