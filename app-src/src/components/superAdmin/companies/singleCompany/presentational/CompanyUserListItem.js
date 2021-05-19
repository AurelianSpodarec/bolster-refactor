import React from 'react';
import { COMPANY_USER_ROLE_IDS } from 'constants/companyAdmin/enums';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { getStorageString, isLowMemory, isLowStorage } from 'helpers/generic';

const CompanyUserListItem = ({ user, handleModalClick, tableColumnWidths }) => (
    <tr>
        <td style={{ width: tableColumnWidths[0] }} className="cell-break-all">
            {user.userFirstName} {user.userLastName} <br />({user.userEmail})
        </td>
        <td style={{ width: tableColumnWidths[1] }} className="cell-break-all">
            {user.userPhoneNumber}
        </td>
        <td style={{ width: tableColumnWidths[2] }}>{COMPANY_USER_ROLE_IDS[String(user.type)]}</td>
        <td style={{ width: tableColumnWidths[3] }}>{user.formattedOperativeCode}</td>
        <td style={{ width: tableColumnWidths[4] }} className="left-align">
            {user.linkedDeviceID ? 'Yes' : 'No'}
        </td>
        <td style={{ width: tableColumnWidths[5] }}>{user.appVersion ? user.appVersion : '-'}</td>
        <td style={{ width: tableColumnWidths[6] }} className="left-align">
            {user.linkedDeviceName ? user.linkedDeviceName : '-'}
            {user.deviceRAM && (
                <>
                    <br />({getStorageString(user.deviceRAM)} RAM.)
                    {isLowMemory(user.deviceRAM) &&
                        'This device has low RAM and may struggle to run the Bolster App.'}
                </>
            )}
            {user.physicalStorageTotal && (
                <>
                    <br />({getStorageString(user.physicalStorageAvailable)} /{' '}
                    {getStorageString(user.physicalStorageTotal)} storage free)
                    {isLowStorage(user.physicalStorageAvailable) &&
                        'This device has low storage space. It may struggle to create new pins or down sync new data.'}
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

export default CompanyUserListItem;
