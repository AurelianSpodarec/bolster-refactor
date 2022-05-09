import React from 'react';
import { connect } from 'react-redux';
import { isIE } from 'react-device-detect';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import DashboardLineGraph from '../presentational/DashboardLineGraph';
import DashboardBarChartContainer from './DashboardBarChartContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Block from 'components/shared/generic/block/presentational/Block';

const DashboardCostingCharts = ({ isFetching, error, datasets, showLineGraph }) => {
    const isDataEmpty = showLineGraph ? isEmpty(datasets) || isEmpty(datasets) : isEmpty(datasets); // TODO - need to check emptiness of costing graph too
    return !isIE ? (
        <Block containerClass="flex-row-item size-lg-6 size-md-12">
            <BlockHeading title={showLineGraph ? 'Costing Totals' : 'Pins added by operatives'} />

            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={isDataEmpty}
                containerClass="size-lg-12"
                noWhiteBackground
            >
                {showLineGraph ? <DashboardLineGraph /> : <DashboardBarChartContainer />}
            </BlockContainer>
        </Block>
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
            // TODO - will be another key for costing graph data
        },
    },
}) => ({
    isFetching: isFetchingDashPinsStats,
    error: error,
    datasets,
});

export default connect(mapStateToProps)(DashboardCostingCharts);
