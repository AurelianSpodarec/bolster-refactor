import React, { useCallback, useState } from 'react';
import { COMPANY_USER_ROLE_IDS } from 'constants/companyAdmin/enums';
import { getLowMemoryMessage } from '../../../../../constants/shared/messages';

import { getStorageString } from 'helpers/generic';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import TooltipContainer from '../../../../shared/generic/tooltip/containers/TooltipContainer';

const CompanyUserListItem = ({ user, handleModalClick, tableColumnWidths }) => {
    const [rowHeight, setRowHeight] = useState(null);
    const lowMemMessage = getLowMemoryMessage(user.deviceRAM, user.physicalStorageAvailable);
    const isRowRed = !!lowMemMessage;

    const row = useCallback(node => {
        if (node !== null) {
            setRowHeight(node.getBoundingClientRect().height);
        }
    }, []);

    console.log(COMPANY_USER_ROLE_IDS[String(user.type)]);

    return (
        <tr ref={row} className={`${isRowRed ? 'red-row' : ''}`}>
            <td style={{ width: tableColumnWidths[0] }} className="cell-break-all">
                {isRowRed && (
                    <TooltipContainer
                        htmlText={`${lowMemMessage ? `<p>${lowMemMessage}</p>` : ''}`}
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
                {user.userIsEmailConfirmed ? 'Yes' : 'No'}
            </td>
            <td style={{ width: tableColumnWidths[8] }} className="left-align">
                {COMPANY_USER_ROLE_IDS[String(user.type)] === 'Operative'
                    ? 'N/A'
                    : user.shouldRestrictPayments
                    ? 'Yes'
                    : 'No'}
            </td>
            <td
                className={isRowRed ? 'red-column' : ''}
                style={{ width: tableColumnWidths[9], height: rowHeight ? rowHeight : 'auto' }}
            >
                <ButtonContainer handleClick={() => handleModalClick()} className="button">
                    View Latest Syncs
                </ButtonContainer>
            </td>
        </tr>
    );
};

export default CompanyUserListItem;
