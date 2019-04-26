import React from 'react';
import { COMPANY_USER_ROLE_IDS } from 'constants/companyAdmin/enums';

const CompanyUserListItem = ({ user }) => (
    <tr>
        <td>
            {user.userFirstName} {user.userLastName}
        </td>
        <td>{user.userEmail}</td>
        <td>{user.userPhoneNumber}</td>
        <td>{COMPANY_USER_ROLE_IDS[String(user.type)]}</td>
        <td>{user.formattedOperativeCode}</td>
        <td>{user.linkedDeviceID ? 'Yes' : 'No'}</td>
    </tr>
);

export default CompanyUserListItem;
