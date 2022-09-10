import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

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
        const { postSuccess, hideModal } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            hideModal();
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { postSuccess, error },
    },
}) => ({
    postSuccess,
    error,
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    unlinkDevice: id => dispatch(unlinkOperativeDevice(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnlinkDeviceModalContainer);
