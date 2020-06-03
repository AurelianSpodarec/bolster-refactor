import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

import RistrictUserPaymentsModal from '../presentational/RistrictUserPaymentsModal';
import toggleRistrictUserPayments from 'actions/companyAdmin/userManagement/async/toggleRistrictUserPayments';

class RistrictPaymentsModalContainer extends Component {
    render() {
        const { hideModal, user, toggleRistrictUserPayments } = this.props;

        const message = user.shouldRestrictPayments
            ? 'Are you sure you want to grant this user permission to use payments?'
            : 'Are you sure you want to restrict payments from this user?';

        return (
            <RistrictUserPaymentsModal
                hideModal={hideModal}
                message={message}
                handleRistrict={() =>
                    toggleRistrictUserPayments({
                        ID: user.id,
                        shouldRestrictPayments: !user.shouldRestrictPayments
                    })
                }
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, hideModal, fetchCompanyUsers } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            setTimeout(function() {
                fetchCompanyUsers();
            }, 750);

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
    toggleRistrictUserPayments: postBody =>
        dispatch(toggleRistrictUserPayments(postBody))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RistrictPaymentsModalContainer);
