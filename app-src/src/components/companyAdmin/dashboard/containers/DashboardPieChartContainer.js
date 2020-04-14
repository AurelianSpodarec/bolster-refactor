import React from 'react';
import { connect } from 'react-redux';
import { isIE } from 'react-device-detect';

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

    return !isIE ? (
        <BlockContainer
            isFetching={isFetching}
            error={error}
            isEmpty={isEmpty(stats)}
            containerClass="flex-row-item size-lg-6 size-md-12"
        >
            <DashboardPieChart stats={stats} onMobile={onMobile} />
        </BlockContainer>
    ) : (
        <BlockContainer
            error={'Pie charts not supported on Internet Explorer'}
            containerClass="flex-row-item size-lg-6 size-md-12"
        />
    );

    function _convertDataSetsToStatusStats() {
        if (!isIE) {
            const statuses = Object.entries(datasets).reduce(
                (acc, [status, countArr]) => ({
                    ...acc,
                    [status]: countArr.reduce((acc, curr) => acc + curr)
                }),
                0
            );
            return { statuses, lastUpdated };
        } else {
            return false;
        }
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
