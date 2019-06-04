import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

import UnlinkDeviceModal from '../presentational/UnlinkDeviceModal';
import unlinkOperativeDevice from 'actions/companyAdmin/userManagement/async/unlinkOperativeDevice';

class UnlinkDeviceModalContainer extends Component {
    render() {
        const { hideModal, message, user, unlinkDevice } = this.props;
        return (
            <UnlinkDeviceModal
                hideModal={hideModal}
                message={message}
                handleUnlink={() => unlinkDevice(user.id)}
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
        companyUsersReducer: { postSuccess, error }
    }
}) => ({
    postSuccess,
    error
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    fetchCompanyUsers: () => dispatch(fetchCompanyUsers()),
    unlinkDevice: id => dispatch(unlinkOperativeDevice(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnlinkDeviceModalContainer);
