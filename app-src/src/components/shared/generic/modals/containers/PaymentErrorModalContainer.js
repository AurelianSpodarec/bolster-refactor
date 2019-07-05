import React, { Component } from 'react';
import { connect } from 'react-redux';

import PaymentErrorModal from '../presentational/PaymentErrorModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

class PaymentErrorModalContainer extends Component {
    state = { disbaledButton: false };
    render() {
        const {
            title = 'Payment Failed',
            message = 'Something went wrong while trying to take your payment, please try again',
            hideModal,
            error
        } = this.props;
        return (
            <PaymentErrorModal
                {...{ title, message, hideModal, error }}
                resubmit={this.handleResubmit}
                disbaledButton={this.state.disbaledButton}
            />
        );
    }

    handleResubmit = e => {
        this.setState({
            disbaledButton: true
        });
        setTimeout(
            () =>
                this.setState({
                    disbaledButton: false
                }),
            3000
        );
        this.props.resubmit(e);
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal())
});

export default connect(
    null,
    mapDispatchToProps
)(PaymentErrorModalContainer);
