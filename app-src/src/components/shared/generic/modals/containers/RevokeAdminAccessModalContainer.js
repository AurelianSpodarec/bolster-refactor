import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

import RevokeAdminAccessModal from '../presentational/RevokeAdminAccessModal';
import changeUserType from 'actions/companyAdmin/userManagement/async/changeUserType';

class RevokeAdminAccessModalContainer extends Component {
    render() {
        const {
            hideModal,
            message,
            user,
            changeUserType,
            loggedInUser
        } = this.props;

        return (
            <RevokeAdminAccessModal
                hideModal={hideModal}
                message={message}
                handleRevoke={() =>
                    changeUserType(user.id, { type: 'Operative' })
                }
                loggedInUser={loggedInUser}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, hideModal, fetchCompanyUsers } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            fetchCompanyUsers();
            hideModal();
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { postSuccess, error, users }
    },
    shared: {
        decodeJWTReducer: { jwtData }
    }
}) => ({
    postSuccess,
    error,
    loggedInUser: users[jwtData.companyUserID]
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    fetchCompanyUsers: () => dispatch(fetchCompanyUsers()),
    changeUserType: (id, postBody) => dispatch(changeUserType(id, postBody))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RevokeAdminAccessModalContainer);
