import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { getStorageString } from 'helpers/generic';
import { getLowMemoryMessage } from 'constants/shared/messages';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { boolToYesNo } from 'helpers/generic';

const AllOperativesListItem = ({
    user,
    showDeleteModal,
    showDisableModal,
    showEnableModal,
    showUnlinkModal,
    showMakeAdminModal,
    onMobile,
    headers,
    showNotUpsyncedRecentlyWarning,
    tooltipDate,
    drawingLimitColour,
    drawingLimitMaxed,
    isDisabled,
}) => {
    const history = useHistory();

    const lowMemMessage = getLowMemoryMessage(user.deviceRAM, user.physicalStorageAvailable);
    const isRowRed = !!lowMemMessage || showNotUpsyncedRecentlyWarning || drawingLimitMaxed;
    const upsyncedMessage = tooltipDate
        ? `This operative has not upsynced in ${tooltipDate} days`
        : 'This operative has never upsynced.';

    return (
        <tr
            key={user.id}
            className={`${isDisabled ? 'grey-row' : isRowRed ? 'red-row' : ''}`}
        >
            <td>
                {isRowRed && (
                    <TooltipContainer
                        htmlText={`${
                            showNotUpsyncedRecentlyWarning ? `<p>${upsyncedMessage}</p>` : ''
                        } ${lowMemMessage ? `<p>${lowMemMessage}</p>` : ''} ${
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
                {isDisabled && <span>(DISABLED)</span>}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                {user.userEmail}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                {user.userPhoneNumber}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                {user.linkedDeviceID ? 'Yes' : 'No'}{' '}
                {user.linkedDeviceName && (
                    <span className="red-text">{`(${user.linkedDeviceName})`}</span>
                )}
                {user.deviceRAM && (
                    <>
                        <br />({getStorageString(user.deviceRAM)} RAM.)
                    </>
                )}
                {user.physicalStorageTotal && (
                    <>
                        <br />({getStorageString(user.physicalStorageAvailable)} /{' '}
                        {getStorageString(user.physicalStorageTotal)} storage free)
                    </>
                )}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
                {user.formattedOperativeCode}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
                {user.lastUpSynced ? <DateTimeContainer date={user.lastUpSynced} /> : '-'}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[6]}</span>}
                {user.lastDetectedUnsyncedData ? (
                    <DateTimeContainer date={user.lastDetectedUnsyncedData} />
                ) : (
                    '-'
                )}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[7]}</span>}
                {user.appVersion ? user.appVersion : '-'}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[8]}</span>}
                <span className={`limit-${drawingLimitColour}`}>{user.drawingCount}</span>
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                {boolToYesNo(user.isEmailConfirmed)}
            </td>
            <td>
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

                    {!isDisabled && (
                        <ButtonContainer className="button yellow" handleClick={showMakeAdminModal}>
                            <i className="far fa-user" /> Make Admin
                        </ButtonContainer>
                    )}

                    <Link
                        className="button yellow"
                        to={`/company/users-management/operatives/${user.id}/edit`}
                    >
                        <i className="far fa-pencil" /> Edit
                    </Link>
                    <Link
                        className="button yellow"
                        to={`/company/users-management/operatives/${user.id}/edit-email`}
                    >
                        <i className="far fa-at" /> Edit Email
                    </Link>
                    <Link
                        className="button yellow"
                        to={`/company/users-management/operatives/${user.id}/documents`}
                    >
                        <i className="far fa-file-upload" /> User Documents
                    </Link>
                    <Link
                        className="button blue"
                        to={`/company/users-management/operative/${user.id}/drawings`}
                    >
                        <i className="far fa-key" /> Drawings Access
                    </Link>

                    {isDisabled ? (
                        <button className="button green" onClick={showEnableModal}>
                            <i className="far fa-check" />
                            Enable
                        </button>
                    ) : (
                        <>
                            <button className="button red" onClick={showDisableModal}>
                                <i className="far fa-ban" />
                                Disable
                            </button>
                            <button className="button red" onClick={showDeleteModal}>
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

export default AllOperativesListItem;
