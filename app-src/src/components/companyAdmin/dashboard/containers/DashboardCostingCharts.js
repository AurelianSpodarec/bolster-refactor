import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { isIE } from 'react-device-detect';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import DashboardLineGraph from '../presentational/DashboardLineGraph';
import DashboardBarChartContainer from './DashboardBarChartContainer';
import { selectIsCostingEnabled } from 'selectors/companyAdmin/companySettings';

const DashboardCostingCharts = ({ isFetching, error, datasets }) => {
    const isCostingEnabled = useSelector(selectIsCostingEnabled);
    return !isIE ? (
        <BlockContainer
            isFetching={isFetching}
            error={error}
            isEmpty={isEmpty(datasets)} // TODO - might need extra logic
            containerClass="size-lg-12"
            noWhiteBackground
        >
            {isCostingEnabled ? <DashboardLineGraph /> : <DashboardBarChartContainer />}
        </BlockContainer>
    ) : (
        <BlockContainer
            error={'Charts are not supported on Internet Explorer'}
            containerClass="flex-row-item size-lg-6 size-md-12"
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        dashboardReducer: {
            isFetchingDashPinsStats,
            error,
            dashRecentPinsStats: { datasets = {} },
        },
    },
}) => ({
    isFetching: isFetchingDashPinsStats,
    error: error,
    datasets,
});

export default connect(mapStateToProps)(DashboardCostingCharts);
