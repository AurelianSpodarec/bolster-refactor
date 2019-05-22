import React from 'react';

import Roles from './Roles';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const UserListItem = ({
    user,
    handleShowEditUserModal,
    handleShowEditUserPasswordModal
}) => (
    <tr>
        <td>{`${user.firstName} ${user.lastName}`}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <Roles roles={user.roles} />
        <td>
            <DateTimeContainer
                date={user.createdOn}
                datetime={DATE_TIME_IDS.DATE}
            />
        </td>
        <td>
            <BlockButtonWrapper>
                <button
                    className="button yellow"
                    onClick={() => handleShowEditUserModal(user)}
                >
                    <i className="far fa-pencil" /> edit
                </button>
                <button
                    onClick={() => handleShowEditUserPasswordModal(user)}
                    className="button"
                >
                    change password
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default UserListItem;
