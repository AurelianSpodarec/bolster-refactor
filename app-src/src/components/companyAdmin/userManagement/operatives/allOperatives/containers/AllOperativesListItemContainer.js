import React from "react";
import { connect } from "react-redux";

import AllOperativesListItem from "../presentational/AllOperativesListItem";
import { showModal } from "actions/shared/generic/modals/sync/showModal";
import {
    DELETE_COMPANY_USER,
    UNLINK_DEVICE,
    CONFIRM_SUBMIT
} from "constants/shared/modalTypes";
import { hideModal } from "actions/shared/generic/modals/sync/hideModal";
import editCompanyUserType from "actions/companyAdmin/userManagement/async/editCompanyUserType";

const AllOperativesListItemContainer = ({
    user,
    colCount,
    showModal,
    hideModal,
    editCompanyUserType,
    headers,
    onMobile
}) => {
    return (
        <AllOperativesListItem
            user={user}
            colCount={colCount}
            showDeleteModal={() =>
                showModal(DELETE_COMPANY_USER, { id: user.id })
            }
            showUnlinkModal={unlinkModal}
            showMakeAdminModal={makeAdminModal}
            headers={headers}
            onMobile={onMobile}
            mobileDeviceName={"##IPhone 11 pro##"}
        />
    );

    function unlinkModal() {
        showModal(UNLINK_DEVICE, {
            hideModal,
            user,
            message: `Are you sure you want to unlink ${user.userFirstName} ${user.userLastName}'s device?`
        });
    }

    function makeAdminModal() {
        const handleSubmit = () => {
            editCompanyUserType(user.id, { type: "Admin" });
            hideModal();
        };
        showModal(CONFIRM_SUBMIT, {
            hideModal,
            user,
            message: `Are you sure you want to make ${user.userFirstName} ${user.userLastName} an admin?`,
            handleSubmit
        });
    }
};

const mapDispatchToProps = { showModal, hideModal, editCompanyUserType };

export default connect(
    null,
    mapDispatchToProps
)(AllOperativesListItemContainer);
