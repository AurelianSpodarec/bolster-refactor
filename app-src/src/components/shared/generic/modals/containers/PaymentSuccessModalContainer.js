import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import PaymentSuccessModal from '../presentational/PaymentSuccessModal';

class PaymentSuccessModalContainer extends Component {
    render() {
        const {
            title = 'Order Complete',
            message = 'Your order has been placed successfully.',
            location
        } = this.props;
        return (
            <PaymentSuccessModal
                title={title}
                message={message}
                location={location}
                handleClose={this.handleClose}
            />
        );
    }

    handleClose = () => {
        const { location, hideModal } = this.props;
        location.pathname.replace(location.pathname);
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
    )(PaymentSuccessModalContainer)
);
