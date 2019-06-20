import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InvoicePayments from 'components/superAdmin/invoices/singleInvoice/presentational/InvoicePayments.js';

const InvoicePaymentsContainer = ({ isFetching, error, invoice, company }) => {
    const [paymentValue, changePaymentInput] = useState(0);
    return (
        <InvoicePayments
            paymentValue={paymentValue}
            handleChange={changePaymentInput}
            isFetching={isFetching}
            error={error}
            invoice={invoice}
            company={company}
        />
    );
};

const mapStateToProps = (
    {
        superAdmin: {
            invoicesReducer: { invoices, isFetching, error },
            companiesReducer: {
                companies,
                isFetching: isFetchingCompanies,
                error: companiesError
            }
        }
    },
    {
        match: {
            params: { companyID, id }
        }
    }
) => ({
    invoice: invoices[id] || null,
    isFetching: isFetching || isFetchingCompanies,
    error: error || companiesError,
    company: companies[companyID] || null
});

export default withRouter(connect(mapStateToProps)(InvoicePaymentsContainer));
