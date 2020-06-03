import React, { useMemo, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import CreditLogsTable from '../presentational/CreditLogsTable';

const CreditLogsTableContainer = ({
    credits,
    invoices,
    isFetching,
    error,
    headers,
    users,
    companyUserID
}) => {
    const filteredCredits = useMemo(
        () =>
            credits.filter(credit => {
                // only show credits for invoices that aren't free
                const invoice = invoices[credit.invoiceID];
                return !invoice || !!invoice.total;
            }),
        [isFetching]
    );
    const [shouldRestrictPayments, setShouldRestrictPayments] = useState(false);

    function usePrevious(value) {
        const ref = useRef(value);
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const prevUsers = usePrevious({ users });

    useEffect(() => {
        if (users && users[companyUserID] && !prevUsers[companyUserID]) {
            setShouldRestrictPayments(
                users[companyUserID].shouldRestrictPayments
            );
        }
    }, [users]);
    return (
        <CreditLogsTable
            headers={headers}
            creditLogs={filteredCredits}
            isFetching={isFetching}
            error={error}
            shouldRestrictPayments={shouldRestrictPayments}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        creditsReducer: { credits, isFetching: fetchingCredits, error },
        invoicesReducer: { invoices, isFetching: fetchingInvoices },
        companyUsersReducer: { users }
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { companyUserID }
        }
    }
}) => ({
    credits: Object.values(credits),
    invoices,
    isFetching: fetchingCredits || fetchingInvoices,
    error,
    headers: ['Date', 'Type', 'Quantity', 'Drawing Heirarchy', 'User', ''],
    users,
    companyUserID
});

export default connect(mapStateToProps)(CreditLogsTableContainer);
