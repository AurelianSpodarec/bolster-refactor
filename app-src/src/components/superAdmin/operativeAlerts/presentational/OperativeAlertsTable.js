import React from 'react';
import { Link } from 'react-router-dom';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import OperativeAlertItem from '../presentational/OperativeAlertItem';
import Table from 'components/shared/generic/tables/presentational/Table';

const OperativeAlertsTable = ({ isFetching, operativeAlerts, headers }) => {
    return (
        <>
            <BlockHeading title="Admin Operative Alerts">
                <Link
                    to="/admin/operative-alerts/create"
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
                {operativeAlerts.map(alert => (
                    <OperativeAlertItem key={alert.id} alert={alert} />
                ))}
            </Table>
        </>
    );
};

export default OperativeAlertsTable;
