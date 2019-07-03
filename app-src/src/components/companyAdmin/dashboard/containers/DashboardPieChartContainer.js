import React from 'react';
import { connect } from 'react-redux';
import DashboardPieChart from '../presentational/DashboardPieChart';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';

const DashboardPieChartContainer = ({
    isFetching,
    error,
    datasets,
    statusStats: { lastUpdated },
    onMobile
}) => {
    const stats = _convertDataSetsToStatusStats();
    return (
        <BlockContainer
            isFetching={isFetching}
            error={error}
            isEmpty={isEmpty(stats)}
            containerClass="flex-row-item size-lg-6 size-md-12"
        >
            <DashboardPieChart stats={stats} onMobile={onMobile} />
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
    },
    shared: {
        mobileReducer: { onMobile }
    }
}) => ({
    statusStats,
    isFetching: isFetchingDashPinsStats,
    error: error,
    datasets,
    onMobile
});

export default connect(mapStateToProps)(DashboardPieChartContainer);
