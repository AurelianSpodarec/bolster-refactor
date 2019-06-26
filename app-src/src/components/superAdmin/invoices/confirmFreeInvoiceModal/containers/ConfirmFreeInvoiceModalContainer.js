import React, { Component } from 'react';
import { connect } from 'react-redux';

import ConfirmFreeInvoiceModal from '../presentational/ConfirmFreeInvoiceModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import makeInvoiceFree from 'actions/superAdmin/invoices/async/makeInvoiceFree.js';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

class ConfirmFreeInvoiceModalContainer extends Component {
    render() {
        const { hideModal } = this.props;
        return (
            <ConfirmFreeInvoiceModal
                handleSubmit={this.handleSubmit}
                hideModal={e => {
                    e.preventDefault();
                    hideModal();
                }}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, showModal } = this.props;
        if (!prevProps.postSuccess && postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: 'The invoice has successfully been made free.'
            });
        }
    };

    handleSubmit = () => {
        const { makeInvoiceFree, id } = this.props;
        makeInvoiceFree(id);
    };
}

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { postSuccess }
    }
}) => ({
    postSuccess
});

const mapDispatchToProps = {
    hideModal,
    makeInvoiceFree,
    showModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmFreeInvoiceModalContainer);
