import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import SinglePinGenerateReportSuccessModal from '../presentational/SinglePinGenerateReportSuccessModal';

class SinglePinGenerateReportSuccessModalContainer extends Component {
    render() {
        return (
            <SinglePinGenerateReportSuccessModal
                handleViewReports={this.handleViewReports}
                handleClose={this.handleClose}
            />
        );
    }

    handleViewReports = () => {
        const { history, hideModal } = this.props;

        history.push('/client/reports');
        hideModal();
    };

    handleClose = () => {
        const { hideModal } = this.props;
        //location.pathname.replace(location.pathname);
        hideModal();
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal())
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(SinglePinGenerateReportSuccessModalContainer)
);
