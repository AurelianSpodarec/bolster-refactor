import React from 'react';

import Table from 'components/generic/presentational/Table';
import CreditLogsList from './CreditLogsList';

const CreditLogsTable = ({ creditLogs, headers, isFetching, error }) => {
    return (
        <div className="content-area size-lg-12">
            <Table
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!creditLogs.length}
                noDataMessage="There are no credit logs to display."
            >
                <CreditLogsList creditLogs={creditLogs} />
            </Table>
        </div>
    );
};

export default CreditLogsTable;
