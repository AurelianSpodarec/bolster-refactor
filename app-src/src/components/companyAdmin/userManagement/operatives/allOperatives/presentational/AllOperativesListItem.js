import React from "react";
import { Link, withRouter } from "react-router-dom";

import BlockButtonWrapper from "components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper";
import ButtonContainer from "components/shared/generic/button/containers/ButtonContainer";

const AllOperativesListItem = ({
    user,
    showDeleteModal,
    showUnlinkModal,
    showMakeAdminModal,
    onMobile,
    headers,
    history,
    mobileDeviceName = ""
}) => {
    return (
        <tr key={user.id}>
            <td>
                {" "}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[0]}</span>
                )}
                {`${user.userFirstName} ${user.userLastName}`}
            </td>
            <td>
                {" "}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[1]}</span>
                )}
                {user.userEmail}
            </td>
            <td>
                {" "}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[2]}</span>
                )}
                {user.userPhoneNumber}
            </td>
            <td>
                {" "}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[3]}</span>
                )}
                {user.linkedDeviceID ? "Yes" : "No"}{" "}
                <span className="red-text">{`(${mobileDeviceName})`}</span>
            </td>
            <td>
                {" "}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[4]}</span>
                )}
                {user.formattedOperativeCode}
            </td>
            <td>
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
                        to={`/company/users-management/operatives/${user.id}/edit-password`}
                    >
                        <i className="far fa-lock-alt fa-fw" />
                        Change Password
                    </Link>
                    <ButtonContainer
                        className="button yellow"
                        handleClick={showMakeAdminModal}
                    >
                        <i className="far fa-user" /> Make Admin
                    </ButtonContainer>
                    <Link
                        className="button yellow"
                        to={`/company/users-management/operatives/${user.id}/edit`}
                    >
                        <i className="far fa-pencil" /> Edit
                    </Link>
                    <Link
                        className="button blue"
                        to={`/company/users-management/operative/${user.id}/drawings`}
                    >
                        <i className="far fa-key" /> Drawings Access
                    </Link>

                    <button className="button red" onClick={showDeleteModal}>
                        <i className="far fa-trash-alt" />
                        Delete
                    </button>
                </BlockButtonWrapper>
            </td>
        </tr>
    );

    function generateReport() {
        history.push({
            pathname: "/company/tools/create-report",
            state: {
                operativeID: user.id
            }
        });
    }
};

export default withRouter(AllOperativesListItem);
