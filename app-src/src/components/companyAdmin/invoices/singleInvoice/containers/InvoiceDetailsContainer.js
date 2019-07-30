import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InvoiceDetails from '../presentational/InvoiceDetails';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class InvoiceDetailsContainer extends Component {
    render() {
        const { invoice, error, isFetching } = this.props;
        return (
            <InvoiceDetails
                invoice={invoice}
                isFetching={isFetching}
                error={error}
            />
        );
    }
    toggleConfirmDeleteModal = () => {
        const { showModal, invoice } = this.props;

        showModal();
    };
}

const mapStateToProps = ({ companyAdmin: { invoicesReducer } }, ownProps) => {
    return {
        invoice: invoicesReducer.invoices[ownProps.match.params.id] || {},
        error: invoicesReducer.error,
        isFetching: invoicesReducer.isFetching
    };
};

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, props) => dispatch(showModal(modalType, props))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InvoiceDetailsContainer)
);
