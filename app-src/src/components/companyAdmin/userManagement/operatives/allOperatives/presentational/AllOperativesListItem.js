import React from 'react';
import { useHistory } from 'react-router-dom';

import { getStorageString } from 'helpers/generic';
import { getLowMemoryMessage } from 'constants/shared/messages';

import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { getDeviceNameColour, getTooltipRamText } from '../../../shared/utils';
import LinkButton from '../../../../../shared/generic/button/presentational/LinkButton';
import OperativeUserActionsMenu from './OperativeUserActionsMenu';

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

    const nameString = `${user.userFirstName} ${user.userLastName} ${
        isDisabled ? '(DISABLED)' : ''
    } - ${user.formattedOperativeCode}`;

    const tooltipText = user.linkedDeviceName ? (
        <>
            <p>{getTooltipRamText(user.deviceRAM, user.physicalStorageAvailable)}</p>
            <p>{getStorageString(user.physicalStorageAvailable)} Storage Free</p>
        </>
    ) : (
        <p>No linked device</p>
    );

    return (
        <tr key={user.id} className={`${isDisabled ? 'grey-row' : isRowRed ? 'red-row' : ''}`}>
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
                <TooltipContainer text={tooltipText} containerSide="left" side="bottom">
                    <span
                        className={getDeviceNameColour(
                            user.deviceRAM,
                            user.physicalStorageAvailable,
                        )}
                    >{`${user.linkedDeviceName || 'No Device Name'}`}</span>
                </TooltipContainer>
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
                    iconWeight="regular"
                    href={`/company/users-management/operative/${user.id}/drawings`}
                />
                <div>
                    <div className="flex flex-row justify-center align-center">
                        <OperativeUserActionsMenu
                            user={user}
                            generateReport={generateReport}
                            isDisabled={isDisabled}
                            showUnlinkModal={showUnlinkModal}
                            showEnableModal={showEnableModal}
                            showDisableModal={showDisableModal}
                            showDeleteModal={showDeleteModal}
                            showMakeAdminModal={showMakeAdminModal}
                        />
                    </div>
                </div>
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
