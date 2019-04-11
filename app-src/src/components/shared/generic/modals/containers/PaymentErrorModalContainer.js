import React, { Component } from 'react';
import { connect } from 'react-redux';

import PaymentErrorModal from '../presentational/PaymentErrorModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

class PaymentErrorModalContainer extends Component {
    render() {
        const {
            title = 'Payment Failed',
            message = 'Something went wrong while trying to take your payment, please try again',
            resubmit,
            hideModal,
            error
        } = this.props;
        return (
            <PaymentErrorModal
                {...{ title, message, resubmit, hideModal, error }}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal())
});

export default connect(
    null,
    mapDispatchToProps
)(PaymentErrorModalContainer);
