import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    DELETE_COMPANY_USER,
    UNLINK_DEVICE,
    REVOKE_ADMIN_ACCESS
} from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AllCompanyAdminsListItem from '../presentational/AllCompanyAdminsListItem';

class AllCompanyAdminsListItemContainer extends Component {
    render() {
        const { user, colCount, loggedInUser, headers, onMobile } = this.props;

        return (
            <AllCompanyAdminsListItem
                user={user}
                colCount={colCount}
                showDeleteModal={this.deleteModal}
                showUnlinkModal={this.unlinkModal}
                showRevokeAdminAccessModal={this.revokeAdminAccess}
                loggedInUser={loggedInUser}
                headers={headers}
                onMobile={onMobile}
            />
        );
    }

    deleteModal = () => {
        const { user, showModal } = this.props;

        showModal(DELETE_COMPANY_USER, { id: user.id });
    };

    unlinkModal = () => {
        const { user, showModal, hideModal } = this.props;

        showModal(UNLINK_DEVICE, {
            hideModal,
            user,
            message: `Are you sure you want to unlink ${user.userFirstName} ${
                user.userLastName
            }'s device?`
        });
    };

    revokeAdminAccess = () => {
        const { user, showModal, hideModal } = this.props;

        showModal(REVOKE_ADMIN_ACCESS, {
            hideModal,
            user,
            message: `Are you sure you want to revoke the admin access for ${
                user.userFirstName
            } ${user.userLastName}?`
        });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users }
    },
    shared: {
        decodeJWTReducer: { jwtData },
        mobileReducer: { onMobile }
    }
}) => ({
    loggedInUser: users[jwtData.companyUserID] || { type: null },
    onMobile,
    jwtData
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllCompanyAdminsListItemContainer);
