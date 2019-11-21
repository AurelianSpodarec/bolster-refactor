import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import CreditLogsTable from '../presentational/CreditLogsTable';

const CreditLogsTableContainer = ({ credits, invoices, isFetching, error, headers }) => {
    const filteredCredits = useMemo(
        () =>
            credits.filter(credit => {
                // only show credits for invoices that aren't free
                const invoice = invoices[credit.invoiceID];
                return (!invoice || !!invoice.total);
            }),
        [isFetching]
    );

    return (
        <CreditLogsTable
            headers={headers}
            creditLogs={filteredCredits}
            isFetching={isFetching}
            error={error}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        creditsReducer: { credits, isFetching: fetchingCredits, error },
        invoicesReducer: { invoices, isFetching: fetchingInvoices }
    }
}) => ({
    credits: Object.values(credits),
    invoices,
    isFetching: fetchingCredits || fetchingInvoices,
    error,
    headers: ['Date', 'Type', 'Quantity', 'Drawing Heirarchy', 'User', '']
});

export default connect(mapStateToProps)(CreditLogsTableContainer);
