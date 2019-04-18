import React from 'react';
import { Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import AllOperativeAlertsList from './AllOperativeAlertsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const OperativeAlertsTable = ({ isFetching, operativeAlerts }) => (
    <>
        <BlockHeading title="Operative Alerts Table">
            <Link
                to="/company/tools/operative-alerts/create"
                className="button"
            >
                <i className="fa fa-plus" /> Create Alert
            </Link>
        </BlockHeading>
        <Table
            headers={[
                'Created By',
                'Message',
                'Sent On',
                '##Sent %##',
                '##Delivered %##',
                '##Read %##',
                ''
            ]}
            withActions
            isFetching={isFetching}
            noData={!operativeAlerts.length}
        >
            <AllOperativeAlertsList operativeAlerts={operativeAlerts} />
        </Table>
    </>
);

export default OperativeAlertsTable;
