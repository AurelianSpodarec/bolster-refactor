import React, { Component } from 'react';
import { connect } from 'react-redux';

import PaymentErrorModal from '../presentational/PaymentErrorModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class PaymentErrorModalContainer extends Component {
    render() {
        const {
            title = 'Payment Failed',
            message = 'Something went wrong while trying to take your payment, please try again',
            resubmit,
            hideModal
        } = this.props;
        return (
            <PaymentErrorModal {...{ title, message, resubmit, hideModal }} />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    null,
    mapDispatchToProps
)(PaymentErrorModalContainer);
