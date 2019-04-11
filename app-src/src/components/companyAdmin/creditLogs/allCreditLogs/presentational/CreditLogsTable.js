import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import CreditLogsList from './CreditLogsList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const CreditLogsTable = ({ creditLogs, headers, isFetching, error }) => {
    return (
        <BlockContainer heading="Drawing Credit Logs">
            <Table
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!creditLogs.length}
                noDataMessage="There are no credit logs to display."
            >
                <CreditLogsList creditLogs={creditLogs} />
            </Table>
        </BlockContainer>
    );
};

export default CreditLogsTable;
