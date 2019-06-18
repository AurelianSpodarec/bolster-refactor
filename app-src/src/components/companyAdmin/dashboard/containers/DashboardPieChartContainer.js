import React from 'react';
import { connect } from 'react-redux';
import DashboardPieChart from '../presentational/DashboardPieChart';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';

const DashboardPieChartContainer = ({
    isFetching,
    error,
    datasets,
    statusStats: { lastUpdated }
}) => {
    const stats = _convertDataSetsToStatusStats();
    return (
        <BlockContainer
            isFetching={isFetching}
            error={error}
            isEmpty={isEmpty(stats)}
            containerClass="flex-row-item size-lg-6"
        >
            <DashboardPieChart stats={stats} />
        </BlockContainer>
    );

    function _convertDataSetsToStatusStats() {
        const statuses = Object.entries(datasets).reduce(
            (acc, [status, countArr]) => ({
                ...acc,
                [status]: countArr.reduce((acc, curr) => acc + curr)
            }),
            0
        );
        return { statuses, lastUpdated };
    }
};

const mapStateToProps = ({
    companyAdmin: {
        dashboardReducer: {
            statusStats,
            isFetchingDashPinsStats,
            error,
            dashRecentPinsStats: { datasets = {} }
        }
    }
}) => ({
    statusStats,
    isFetching: isFetchingDashPinsStats,
    error: error,
    datasets
});

export default connect(mapStateToProps)(DashboardPieChartContainer);
