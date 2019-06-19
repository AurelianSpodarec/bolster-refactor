import React from 'react';
import { Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import AllOperativeAlertsList from './AllOperativeAlertsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const OperativeAlertsTable = ({ isFetching, operativeAlerts, headers }) => (
    <>
        <BlockHeading title="Operative Alerts">
            <Link
                to="/company/message-centre/operative-alerts/create"
                className="button green"
            >
                <i className="fa fa-plus" /> Create Alert
            </Link>
        </BlockHeading>
        <Table
            headers={headers}
            withActions
            isFetching={isFetching}
            noData={!operativeAlerts.length}
            noDataMessage="There are no operative alerts to display."
        >
            <AllOperativeAlertsList operativeAlerts={operativeAlerts} />
        </Table>
    </>
);

export default OperativeAlertsTable;
