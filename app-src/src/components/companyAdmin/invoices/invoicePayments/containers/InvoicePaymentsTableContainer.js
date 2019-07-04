import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import fetchSingleInvoicePayments from 'actions/companyAdmin/invoices/async/fetchSingleInvoicePayments';
import { componentDidMount } from 'helpers/generic';
import InvoicePaymentsTable from '../presentational/InvoicePaymentsTable';

const InvoicePaymentsTableContainer = ({
    invoicePayments,
    fetchSingleInvoicePayments,
    invoiceID,
    onMobile
}) => {
    componentDidMount(() => fetchSingleInvoicePayments(invoiceID));
    const headers = ['Amount', 'Date'];
    return (
        <InvoicePaymentsTable
            payments={invoicePayments}
            headers={headers}
            onMobile={onMobile}
        />
    );
};

const mapStateToProps = (
    {
        companyAdmin: {
            invoicesReducer: { invoicePayments }
        },
        shared: {
            mobileReducer: { onMobile }
        }
    },
    { match: { params } }
) => ({
    invoicePayments: Object.values(invoicePayments).filter(
        payment => +payment.invoiceID === +params.id
    ),
    invoiceID: params.id,
    onMobile
});

const mapDispatchToProps = { fetchSingleInvoicePayments };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InvoicePaymentsTableContainer)
);
