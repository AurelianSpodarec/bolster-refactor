import React, { Component } from 'react';
import { connect } from 'react-redux';

import ConfirmSetIsInvoicePaidModal from '../presentational/ConfirmSetIsInvoicePaidModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import setIsInvoicePaid from 'actions/superAdmin/invoices/async/setIsInvoicePaid';

class ConfirmSetIsInvoicePaidModalContainer extends Component {
    render = () => (
        <ConfirmSetIsInvoicePaidModal
            handleSubmit={this.handleSubmit}
            isPaid={this.props.isPaid}
            hideModal={e => {
                e.preventDefault();
                this.props.hideModal();
            }}
        />
    );

    componentDidUpdate = prevProps => {
        const { postSuccess, error, isPaid, showModal } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: `The invoice has successfully been marked as ${
                    isPaid ? 'unpaid' : 'paid'
                }.`
            });
        }
        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                message:
                    'There was a problem processing your request. Please try again later.'
            });
        }
    };

    handleSubmit = () => {
        const { setIsInvoicePaid, id, isPaid } = this.props;
        setIsInvoicePaid(id, !isPaid);
    };
}

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { postSuccess, error }
    }
}) => ({
    postSuccess,
    error
});

const mapDispatchToProps = {
    hideModal,
    setIsInvoicePaid,
    showModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmSetIsInvoicePaidModalContainer);
