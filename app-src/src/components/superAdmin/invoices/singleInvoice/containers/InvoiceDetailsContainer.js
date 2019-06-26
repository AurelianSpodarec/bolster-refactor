import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InvoiceDetails from '../presentational/InvoiceDetails';

const InvoiceDetailsContainer = ({ invoice, error, isFetching, company }) => {
    const companyName = company ? company.name : null;
    return (
        <InvoiceDetails
            invoice={invoice}
            error={error}
            isFetching={isFetching}
            companyName={companyName}
        />
    );
};

const mapStateToProps = (
    {
        superAdmin: {
            invoicesReducer: { invoices, error, isFetching },
            companiesReducer: { companies }
        }
    },
    { match }
) => {
    const invoice = invoices[match.params.id] || {};
    const company = companies[invoice.companyID] || null;

    return {
        company,
        invoice,
        error,
        isFetching
    };
};

export default withRouter(connect(mapStateToProps)(InvoiceDetailsContainer));
