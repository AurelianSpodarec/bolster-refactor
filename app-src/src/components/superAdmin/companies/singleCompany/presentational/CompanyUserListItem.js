import React from 'react';
import { COMPANY_USER_ROLE_IDS } from 'constants/companyAdmin/enums';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const CompanyUserListItem = ({ user, handleModalClick }) => (
    <tr>
        <td>
            {user.userFirstName} {user.userLastName} ({user.userEmail})
        </td>
        {/* <td className="email-field">{user.userEmail}</td> */}
        <td>{user.userPhoneNumber}</td>
        <td>{COMPANY_USER_ROLE_IDS[String(user.type)]}</td>
        <td>{user.formattedOperativeCode}</td>
        <td className="left-align">{user.linkedDeviceID ? 'Yes' : 'No'}</td>
        <td>{user.deviceType ? user.deviceType : '-'}</td>
        <td className="left-align">{user.deviceType ? user.deviceType : '-'}</td>
        <td>
            <ButtonContainer handleClick={() => handleModalClick()} className="button">
                View Latest Syncs
            </ButtonContainer>
        </td>
    </tr>
);

export default CompanyUserListItem;
