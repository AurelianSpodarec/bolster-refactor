import React from 'react';
import { Link } from 'react-router-dom';

import Table from 'components_DEPRECATED/shared/generic/tables/presentational/Table';
import CreditLogsList from './CreditLogsList';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';

const CreditLogsTable = ({ creditLogs, isFetching, headers, error, shouldRestrictPayments }) => (
    <div className="size-lg-12">
        <BlockHeading title="Credit Logs">
            {!shouldRestrictPayments && (
                <Link to="/company/subscription" className="button green">
                    <i className="fa fa-plus" /> Get Credits
                </Link>
            )}
        </BlockHeading>
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!creditLogs.length}
            noDataMessage="No credit logs to display."
        >
            <CreditLogsList creditLogs={creditLogs} />
        </Table>
    </div>
);

export default CreditLogsTable;
