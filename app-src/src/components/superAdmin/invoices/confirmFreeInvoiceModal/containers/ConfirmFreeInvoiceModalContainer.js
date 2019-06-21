import React, { Component } from 'react';
import { connect } from 'react-redux';

import ConfirmFreeInvoiceModal from '../presentational/ConfirmFreeInvoiceModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import makeInvoiceFree from 'actions/superAdmin/invoices/async/makeInvoiceFree.js';

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

    handleSubmit = () => {
        const { makeInvoiceFree, id } = this.props;
        makeInvoiceFree(id);
    };
}

const mapDispatchToProps = {
    hideModal,
    makeInvoiceFree
};

export default connect(
    null,
    mapDispatchToProps
)(ConfirmFreeInvoiceModalContainer);
