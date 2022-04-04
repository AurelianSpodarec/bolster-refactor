import React from 'react';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ActionMenuLinkButton from 'components/shared/actionMenu/ActionMenuLinkButton';

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
        <ActionMenuActionButton text="Generate Report" onClick={generateReport} />

        {user.linkedDeviceID && !isDisabled && (
            <ActionMenuActionButton text="Unlink Device" onClick={showUnlinkModal} />
        )}

        <ActionMenuLinkButton
            text="Timesheet"
            href={`/company/users-management/operatives/${user.id}/timesheet`}
        />

        <ActionMenuLinkButton
            text="Edit"
            href={`/company/users-management/operatives/${user.id}/edit`}
        />

        <ActionMenuLinkButton
            text="Edit Email"
            href={`/company/users-management/operatives/${user.id}/edit-email`}
        />

        <ActionMenuLinkButton
            text="Documents"
            href={`/company/users-management/operatives/${user.id}/documents`}
        />

        {isDisabled ? (
            <ActionMenuActionButton text="Enable" onClick={showEnableModal} />
        ) : (
            <>
                <ActionMenuActionButton text="Make Admin" onClick={showMakeAdminModal} />
                <ActionMenuActionButton text="Disable" onClick={showDisableModal} />
                <ActionMenuActionButton text="Delete" onClick={showDeleteModal} isNegative />
            </>
        )}
    </ActionMenu>
);

export default CompanyAdminUserActionsMenu;
