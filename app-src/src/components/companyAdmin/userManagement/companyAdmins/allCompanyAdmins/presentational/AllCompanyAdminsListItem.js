import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

const AllCompanyAdminsListItem = ({
    user,
    showDeleteModal,
    showUnlinkModal,
    showRevokeAdminAccessModal,
    loggedInUser,
    onMobile,
    headers,
    history
}) => {
    return (
        <tr key={user.id}>
            <td>
                {onMobile && (
                    <span className="mobile-table-heading">{headers[0]}</span>
                )}
                {`${user.userFirstName} ${user.userLastName}`}{' '}
                {user.type === COMPANY_USER_ROLE_TYPES.OWNER ? (
                    <span>(OWNER)</span>
                ) : null}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[1]}</span>
                )}
                {user.userEmail}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[2]}</span>
                )}
                {user.userPhoneNumber}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[3]}</span>
                )}
                {user.linkedDeviceID ? 'Yes' : 'No'}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[4]}</span>
                )}
                {user.formattedOperativeCode}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[5]}</span>
                )}
                <BlockButtonWrapper additionalClasses="stacked">
                    {user.linkedDeviceID && (
                        <button
                            className="button blue"
                            onClick={showUnlinkModal}
                        >
                            <i className="far fa-unlink" />
                            Unlink Device
                        </button>
                    )}
                    <button className="button" onClick={generateReport}>
                        Generate Report
                    </button>
                    <Link
                        className="button green"
                        to={`/company/users-management/company-admins/${
                            user.id
                        }/edit-password`}
                    >
                        <i className="far fa-lock-alt fa-fw" />
                        Change password
                    </Link>
                    <Link
                        className="button yellow "
                        to={`/company/users-management/company-admins/${
                            user.id
                        }/edit`}
                    >
                        <i className="far fa-pencil" />
                        Edit
                    </Link>
                    <Link
                        className="button blue"
                        to={`/company/users-management/company-admins/${
                            user.id
                        }/drawings`}
                    >
                        <i className="far fa-key" /> Drawings Access
                    </Link>
                    {loggedInUser.type === +COMPANY_USER_ROLE_TYPES.OWNER &&
                        +user.type !== +COMPANY_USER_ROLE_TYPES.OWNER && (
                            <button
                                className="button red"
                                onClick={() =>
                                    showRevokeAdminAccessModal(user.id)
                                }
                            >
                                <i className="far fa-ban" />
                                Revoke Admin
                            </button>
                        )}
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
                </BlockButtonWrapper>
            </td>
        </tr>
    );

    function generateReport() {
        history.push({
            pathname: '/company/tools/create-report',
            state: {
                operativeID: user.id
            }
        });
    }
};

export default withRouter(AllCompanyAdminsListItem);
