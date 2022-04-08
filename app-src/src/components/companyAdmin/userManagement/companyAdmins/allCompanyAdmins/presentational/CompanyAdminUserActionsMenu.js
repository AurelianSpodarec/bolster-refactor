import React from 'react';

import { COMPANY_USER_ROLE_TYPES } from '../../../../../../constants/companyAdmin/enums';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ActionMenuLinkButton from 'components/shared/actionMenu/ActionMenuLinkButton';

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
        <ActionMenuActionButton text="Generate Report" onClick={generateReport} />

        {user.linkedDeviceID && !isDisabled && (
            <ActionMenuActionButton text="Unlink Device" onClick={showUnlinkModal} />
        )}

        <ActionMenuLinkButton
            text="Timesheet"
            href={`/company/users-management/company-admins/${user.id}/timesheet`}
        />

        <ActionMenuLinkButton
            text="Edit"
            href={`/company/users-management/company-admins/${user.id}/edit`}
        />

        <ActionMenuLinkButton
            text="Edit Email"
            href={`/company/users-management/company-admins/${user.id}/edit-email`}
        />

        <ActionMenuLinkButton
            text="Documents"
            href={`/company/users-management/company-admins/${user.id}/documents`}
        />

        {loggedInUser.type === +COMPANY_USER_ROLE_TYPES.OWNER &&
            +user.type !== +COMPANY_USER_ROLE_TYPES.OWNER &&
            (user.shouldRestrictPayments ? (
                <ActionMenuActionButton
                    text="Enable Payments"
                    onClick={() => showRestrictUserPaymentsModal(user.id)}
                />
            ) : !isDisabled ? (
                <>
                    <ActionMenuActionButton
                        text="Revoke Admin"
                        onClick={() => showRevokeAdminAccessModal(user.id)}
                    />

                    <ActionMenuActionButton
                        text="Restrict Payments"
                        onClick={() => showRestrictUserPaymentsModal(user.id)}
                    />
                </>
            ) : (
                <></>
            ))}

        {+user.type !== +COMPANY_USER_ROLE_TYPES.OWNER && (
            <>
                {isDisabled ? (
                    <ActionMenuActionButton
                        text="Enable"
                        onClick={() => showEnableModal(user.id)}
                    />
                ) : (
                    <>
                        <ActionMenuActionButton
                            text="Disable"
                            onClick={() => showDisableModal(user.id)}
                        />

                        <ActionMenuActionButton
                            text="Delete"
                            onClick={() => showDeleteModal(user.id)}
                            isNegative
                        />
                    </>
                )}
            </>
        )}
    </ActionMenu>
);

export default CompanyAdminUserActionsMenu;
