import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import CreditLogsList from './CreditLogsList';

const CreditLogsTable = ({ creditLogs, isFetching, headers, error }) => (
    <Table
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!creditLogs}
        noDataMessage="There are no credit logs to display."
    >
        <CreditLogsList creditLogs={creditLogs} />
    </Table>
);

export default CreditLogsTable;
