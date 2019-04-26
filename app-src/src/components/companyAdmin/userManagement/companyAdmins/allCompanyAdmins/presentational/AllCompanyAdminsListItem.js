import React from 'react';
import { Link } from 'react-router-dom';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import ButtonNoClickContainer from 'components/shared/generic/button/containers/ButtonNoClickContainer';

const AllCompanyAdminsListItem = ({ user, showDeleteModal }) => (
    <tr key={user.id}>
        <td>
            {`${user.userFirstName} ${user.userLastName}`}{' '}
            {user.type === COMPANY_USER_ROLE_TYPES.OWNER ? (
                <span>(OWNER)</span>
            ) : (
                <></>
            )}{' '}
        </td>
        <td>{user.userEmail}</td>
        <td>{user.userPhoneNumber}</td>
        <td>
            <BlockButtonWrapper>
                {+user.type !== +COMPANY_USER_ROLE_TYPES.OWNER ? (
                    <button
                        className="button red"
                        onClick={() => showDeleteModal(user.id)}
                    >
                        <i className="far fa-trash-alt" />
                        Delete
                    </button>
                ) : (
                    <></>
                )}
                <Link
                    className="button yellow "
                    to={`/company/users-management/company-admins/${
                        user.id
                    }/edit`}
                >
                    <i className="far fa-pencil" />
                    Edit
                </Link>
                <ButtonNoClickContainer
                    to={`/company/users-management/company-admins/${
                        user.id
                    }/edit-password`}
                >
                    Change password
                </ButtonNoClickContainer>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default AllCompanyAdminsListItem;
