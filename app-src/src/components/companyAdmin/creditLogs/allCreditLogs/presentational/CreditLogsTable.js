import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

import Table from 'components/shared/generic/tables/presentational/Table';
import CreditLogsList from './CreditLogsList';

const CreditLogsTable = ({ creditLogs, headers, isFetching, error }) => {
    return (
        <Block>
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
        </Block>
    );
};

export default CreditLogsTable;
