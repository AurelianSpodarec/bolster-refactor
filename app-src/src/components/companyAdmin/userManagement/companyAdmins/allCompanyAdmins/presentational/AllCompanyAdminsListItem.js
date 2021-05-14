import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { boolToYesNo } from 'helpers/generic';

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
    const showRedWarning = showNotUpsyncedRecentlyWarning || drawingLimitMaxed;

    return (
        <tr
            key={user.id}
            className={`${isDisabled ? 'grey-row' : showRedWarning ? 'red-row' : ''}`}
        >
            <td>
                {showRedWarning && (
                    <TooltipContainer
                        htmlText={`${
                            tooltipDate
                                ? `<p>This operative has not upsynced in ${tooltipDate} days</p>`
                                : '<p>This operative has never upsynced<p>'
                        } ${
                            drawingLimitColour === 'red'
                                ? '<p>This operative has reached the maximum number of drawings.</p>'
                                : ''
                        }`}
                        containerSide="left"
                    >
                        <i className="far fa-exclamation-triangle red-icon" />
                    </TooltipContainer>
                )}
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                {`${user.userFirstName} ${user.userLastName}`}{' '}
                {user.type === COMPANY_USER_ROLE_TYPES.OWNER ? <span>(OWNER)</span> : null}
                {isDisabled && <span>(DISABLED)</span>}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                {user.userEmail}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                {user.userPhoneNumber}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                {user.linkedDeviceID ? 'Yes' : 'No'}
                {user.linkedDeviceName && (
                    <span className="red-text">{` (${user.linkedDeviceName})`}</span>
                )}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
                {user.formattedOperativeCode}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
                {user.lastUpSynced ? <DateTimeContainer date={user.lastUpSynced} /> : '-'}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[6]}</span>}
                {user.lastDetectedUnsyncedData ? (
                    <DateTimeContainer date={user.lastDetectedUnsyncedData} />
                ) : (
                    '-'
                )}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[7]}</span>}
                {user.appVersion ? `${user.appVersion}` : '-'}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[8]}</span>}
                <span className={`limit-${drawingLimitColour}`}>{user.drawingCount}</span>
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[9]}</span>}
                {boolToYesNo(user.isEmailConfirmed)}
            </td>
            <td>
                {' '}
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
                        className="button blue"
                        to={`/company/users-management/company-admins/${user.id}/drawings`}
                    >
                        <i className="far fa-key" /> Drawings Access
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
            </td>
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
