import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import DashboardPinFeedList from './DashboardPinFeedList';

const DashboardPinFeedTable = ({ pins, isFetching, error, headers }) => (
    <div className="size-lg-12 ignore-padding pinfeed-scroll">
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!pins.length}
            noDataMessage="No pins to display"
            extraClasses="with-scrollbar"
        >
            <DashboardPinFeedList pins={pins} />
        </Table>
    </div>
);

export default DashboardPinFeedTable;
