import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSingleInvoice from 'actions/companyAdmin/invoices/async/fetchSingleInvoiceItems';
import fetchSingleInvoiceItems from 'actions/companyAdmin/invoices/async/fetchSingleInvoice';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import SingleInvoice from '../presentational/SingleInvoice';

class SingleInvoiceContainer extends Component {
    render() {
        return (
            <SingleInvoice
                id={this.props.id}
                showModal={this.props.showModal}
                hasPayed={!!this.props.invoicePayments.length}
            />
        );
    }

    componentDidMount = () => {
        this.props.fetchInvoiceAndItems(this.props.id);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            invoicesReducer: { invoicePayments }
        }
    },
    { match }
) => ({
    id: match.params.id,
    invoicePayments: Object.values(invoicePayments).filter(
        payment => +payment.invoiceID === +match.params.id
    )
});

const mapDispatchToProps = dispatch => ({
    fetchInvoiceAndItems: id => {
        dispatch(fetchSingleInvoice(id));
        dispatch(fetchSingleInvoiceItems(id));
    },
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SingleInvoiceContainer)
);
