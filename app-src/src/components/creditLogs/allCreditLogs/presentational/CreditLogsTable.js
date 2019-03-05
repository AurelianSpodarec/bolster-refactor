import React from 'react';

import Table from 'components/generic/tables/presentational/Table';
import CreditLogsList from './CreditLogsList';

const CreditLogsTable = ({ creditLogs, headers, isFetching, error }) => {
    return (
        <div className="content-area size-lg-12">
            <h3 className="heading heading-3 size-lg-12">
                Drawing Credit Logs
            </h3>

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
