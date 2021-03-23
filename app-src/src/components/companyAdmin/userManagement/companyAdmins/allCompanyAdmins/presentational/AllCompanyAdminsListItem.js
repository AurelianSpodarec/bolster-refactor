import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const AllCompanyAdminsListItem = ({
    user,
    showDeleteModal,
    showDisableModal,
    showUnlinkModal,
    showRevokeAdminAccessModal,
    showRestrictUserPaymentsModal,
    loggedInUser,
    onMobile,
    headers,
    showNotUpsyncedRecentlyWarning,
    tooltipDate,
}) => {
    const history = useHistory();
    return (
        <tr key={user.id} className={`${showNotUpsyncedRecentlyWarning ? 'red-row' : ''}`}>
            <td>
                {showNotUpsyncedRecentlyWarning && (
                    <TooltipContainer
                        text={
                            tooltipDate
                                ? `This operative has not upsynced in ${tooltipDate} days`
                                : 'This operative has never upsynced'
                        }
                        containerSide="left"
                    >
                        <i className="far fa-exclamation-triangle red-icon" />
                    </TooltipContainer>
                )}
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                {`${user.userFirstName} ${user.userLastName}`}{' '}
                {user.type === COMPANY_USER_ROLE_TYPES.OWNER ? <span>(OWNER)</span> : null}
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
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
                <BlockButtonWrapper additionalClasses="stacked">
                    {user.linkedDeviceID && (
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
                        className="button blue"
                        to={`/company/users-management/company-admins/${user.id}/drawings`}
                    >
                        <i className="far fa-key" /> Drawings Access
                    </Link>
                    {loggedInUser.type === +COMPANY_USER_ROLE_TYPES.OWNER &&
                        +user.type !== +COMPANY_USER_ROLE_TYPES.OWNER && (
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
                            <button
                                className="button red"
                                onClick={() => showDisableModal(user.id)}
                            >
                                <i className="far fa-ban" />
                                Disable
                            </button>
                            <button className="button red" onClick={() => showDeleteModal(user.id)}>
                                <i className="far fa-trash-alt" />
                                Delete
                            </button>
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
