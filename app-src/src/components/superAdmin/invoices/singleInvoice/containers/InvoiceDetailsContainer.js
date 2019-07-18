import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InvoiceDetails from '../presentational/InvoiceDetails';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

const InvoiceDetailsContainer = ({
    invoice,
    error,
    isFetching,
    company,
    showModal
}) => (
    <InvoiceDetails
        invoice={invoice}
        error={error}
        isFetching={isFetching}
        companyName={company.name || null}
        showModal={showModal}
    />
);

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
    return {
        company: companies[invoice.companyID] || {},
        invoice: invoices[match.params.id] || {},
        error,
        isFetching
    };
};

const mapDispatchToProps = { showModal };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InvoiceDetailsContainer)
);
