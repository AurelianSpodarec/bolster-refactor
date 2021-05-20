import React from 'react';
import { COMPANY_USER_ROLE_IDS } from 'constants/companyAdmin/enums';
import { lowMemoryMessage, lowStorageMessage } from '../../../../../constants/shared/messages';

import { getStorageString, isLowMemory, isLowStorage } from 'helpers/generic';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import TooltipContainer from '../../../../shared/generic/tooltip/containers/TooltipContainer';

const CompanyUserListItem = ({ user, handleModalClick, tableColumnWidths }) => {
    const isMemoryLow = user.deviceRAM && isLowMemory(user.deviceRAM);
    const isStorageLow = user.physicalStorageTotal && isLowStorage(user.physicalStorageAvailable);
    const isRowRed = isMemoryLow || isStorageLow;

    return (
        <tr className={`${isRowRed ? 'red-row' : ''}`}>
            <td style={{ width: tableColumnWidths[0] }} className="cell-break-all">
                {isRowRed && (
                    <TooltipContainer
                        htmlText={`${isMemoryLow ? `<p>${lowMemoryMessage}</p>` : ''} ${
                            isStorageLow ? `<p>${lowStorageMessage}</p>` : ''
                        }`}
                        containerSide="left"
                    >
                        <i className="far fa-exclamation-triangle red-icon" />
                    </TooltipContainer>
                )}
                {user.userFirstName} {user.userLastName} <br />({user.userEmail})
            </td>
            <td style={{ width: tableColumnWidths[1] }} className="cell-break-all">
                {user.userPhoneNumber}
            </td>
            <td style={{ width: tableColumnWidths[2] }}>
                {COMPANY_USER_ROLE_IDS[String(user.type)]}
            </td>
            <td style={{ width: tableColumnWidths[3] }}>{user.formattedOperativeCode}</td>
            <td style={{ width: tableColumnWidths[4] }} className="left-align">
                {user.linkedDeviceID ? 'Yes' : 'No'}
            </td>
            <td style={{ width: tableColumnWidths[5] }}>
                {user.appVersion ? user.appVersion : '-'}
            </td>
            <td style={{ width: tableColumnWidths[6] }} className="left-align">
                {user.linkedDeviceName ? user.linkedDeviceName : '-'}
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
            <td style={{ width: tableColumnWidths[7] }}>
                <ButtonContainer handleClick={() => handleModalClick()} className="button">
                    View Latest Syncs
                </ButtonContainer>
            </td>
        </tr>
    );
};

export default CompanyUserListItem;
