import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { isLowMemory, isLowStorage, isMinMemory } from 'helpers/generic';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { getLowMemoryMessage } from 'constants/shared/messages';
import UserActionsMenu from '../../../shared/menus/UserActionsMenu';
import LinkButton from '../../../../../shared/generic/button/presentational/LinkButton';

const AllCompanyAdminsListItem = ({
    user,
    showDeleteModal,
    showDisableModal,
    showEnableModal,
    showUnlinkModal,
    showRevokeAdminAccessModal,
    showRestrictUserPaymentsModal,
    loggedInUser,
    onMobile,
    headers,
    showNotUpsyncedRecentlyWarning,
    tooltipDate,
    isDisabled,
    drawingLimitColour,
    drawingLimitMaxed,
}) => {
    const history = useHistory();
    const [showUserActions, setShowUserActions] = useState(false);

    const lowMemMessage = getLowMemoryMessage(user.deviceRAM, user.physicalStorageAvailable);

    const isRowRed = lowMemMessage !== null || showNotUpsyncedRecentlyWarning || drawingLimitMaxed;
    const upsyncedMessage = tooltipDate
        ? `This operative has not upsynced in ${tooltipDate} days`
        : 'This operative has never upsynced.';

    const userStatus =
        user.type === COMPANY_USER_ROLE_TYPES.OWNER ? '(OWNER)' : isDisabled ? '(DISABLED)' : '';
    const nameString = `${user.userFirstName} ${user.userLastName} ${userStatus} - ${user.formattedOperativeCode}`;

    const getDeviceNameColour = () => {
        const memory = user.deviceRAM;
        const storage = user.physicalStorageAvailable;
        const isRamLow = !!memory && isLowMemory(memory);
        const isRamMin = !!memory && isMinMemory(memory);
        const isStorageLow = !!storage && isLowStorage(storage);

        if (isRamLow || isStorageLow) {
            return 'red-text';
        } else if (isRamMin) {
            return 'warning-text';
        } else {
            return '';
        }
    };

    const deviceNameColor = getDeviceNameColour();

    return (
        <tr
            key={user.id}
            className={`user-table ${isDisabled ? 'grey-row' : isRowRed ? 'red-row' : ''}`}
        >
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                <span>{nameString}</span>
                <br />
                <div className="email">
                    {user.userEmail}{' '}
                    {user.isEmailConfirmed ? <i className="fas fa-check-circle" /> : ''}
                </div>
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                {user.userPhoneNumber || '-'}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}

                <span className={deviceNameColor}>{`${
                    user.linkedDeviceName || 'No Device Name'
                }`}</span>
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
                {user.lastUpSynced ? <DateTimeContainer date={user.lastUpSynced} /> : '-'}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[7]}</span>}
                {user.appVersion ? `${user.appVersion}` : '-'}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[8]}</span>}
                <span className={`limit-${drawingLimitColour}`}>{user.drawingCount}</span>
            </td>
            <td>
                <LinkButton
                    text="Drawing Access"
                    size="small"
                    icon="key"
                    href={`/company/users-management/company-admins/${user.id}/drawings`}
                />
                <div onClick={() => setShowUserActions(!showUserActions)}>
                    <i className="fa fa-ellipsis-v" />
                </div>
            </td>

            {showUserActions && (
                <UserActionsMenu>
                    {onMobile && <span className="mobile-table-heading">{headers[10]}</span>}
                    <BlockButtonWrapper additionalClasses="stacked">
                        {user.linkedDeviceID && !isDisabled && (
                            <button className="button blue" onClick={showUnlinkModal}>
                                <i className="far fa-unlink" />
                                Unlink Device
                            </button>
                        )}
                        <button className="button" onClick={generateReport}>
                            Generate Report
                        </button>
                        <Link
                            className="button green"
                            to={`/company/users-management/company-admins/${user.id}/timesheet`}
                        >
                            <i className="far fa-eye" /> View Timesheet
                        </Link>
                        <Link
                            className="button yellow "
                            to={`/company/users-management/company-admins/${user.id}/edit`}
                        >
                            <i className="far fa-pencil" />
                            Edit
                        </Link>
                        <Link
                            className="button yellow "
                            to={`/company/users-management/company-admins/${user.id}/edit-email`}
                        >
                            <i className="far fa-at" />
                            Edit Email
                        </Link>
                        <Link
                            className="button yellow "
                            to={`/company/users-management/company-admins/${user.id}/documents`}
                        >
                            <i className="far fa-file-upload" />
                            User Documents
                        </Link>
                        {loggedInUser.type === +COMPANY_USER_ROLE_TYPES.OWNER &&
                            +user.type !== +COMPANY_USER_ROLE_TYPES.OWNER &&
                            !isDisabled && (
                                <button
                                    className="button red"
                                    onClick={() => showRevokeAdminAccessModal(user.id)}
                                >
                                    <i className="far fa-ban" />
                                    Revoke Admin
                                </button>
                            )}
                        {loggedInUser.type === +COMPANY_USER_ROLE_TYPES.OWNER &&
                            +user.type !== +COMPANY_USER_ROLE_TYPES.OWNER &&
                            (user.shouldRestrictPayments ? (
                                <button
                                    className="button green"
                                    onClick={() => showRestrictUserPaymentsModal(user.id)}
                                >
                                    <i className="far fa-money-bill-alt" />
                                    Enable Payments
                                </button>
                            ) : isDisabled ? (
                                <></>
                            ) : (
                                <button
                                    className="button red"
                                    onClick={() => showRestrictUserPaymentsModal(user.id)}
                                >
                                    <i className="far fa-money-bill-alt" />
                                    Restrict Payments
                                </button>
                            ))}

                        {+user.type !== +COMPANY_USER_ROLE_TYPES.OWNER && (
                            <>
                                {isDisabled ? (
                                    <button
                                        className="button green"
                                        onClick={() => showEnableModal(user.id)}
                                    >
                                        <i className="far fa-check" />
                                        Enable
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="button red"
                                            onClick={() => showDisableModal(user.id)}
                                        >
                                            <i className="far fa-ban" />
                                            Disable
                                        </button>
                                        <button
                                            className="button red"
                                            onClick={() => showDeleteModal(user.id)}
                                        >
                                            <i className="far fa-trash-alt" />
                                            Delete
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </BlockButtonWrapper>
                </UserActionsMenu>
            )}
        </tr>
    );

    function generateReport() {
        history.push({
            pathname: '/company/tools/create-report',
            state: {
                operativeID: user.id,
            },
        });
    }
};

export default AllCompanyAdminsListItem;
