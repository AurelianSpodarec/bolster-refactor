import React from 'react';
import { connect } from 'react-redux';

import CreditLogsTable from '../presentational/CreditLogsTable';

const CreditLogsTableContainer = ({ credits, isFetching, error, headers }) => (
    <CreditLogsTable
        headers={headers}
        creditLogs={credits}
        isFetching={isFetching}
        error={error}
    />
);

const mapStateToProps = ({
    companyAdmin: {
        creditsReducer: { credits, isFetching, error }
    }
}) => ({
    credits: Object.values(credits) || null,
    isFetching,
    error,
    headers: ['Date', 'Type', 'Quantity', '']
});

export default connect(mapStateToProps)(CreditLogsTableContainer);
