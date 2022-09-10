import React from 'react';
import { connect } from 'react-redux';
import { isIE } from 'react-device-detect';

import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import DashboardLineGraph from '../presentational/DashboardLineGraph';
import DashboardBarChartContainer from './DashboardBarChartContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import Block from 'components_DEPRECATED/shared/generic/block/presentational/Block';

const DashboardCostingCharts = ({
    isFetching,
    error,
    recentPinDatasets,
    showLineGraph,
    costEstGraph,
    costEstGraphTitle,
}) => {
    const isCEDataEmpty = !costEstGraph?.dataSets?.length;
    const isBarChartEmpty = isEmpty(recentPinDatasets);

    return !isIE ? (
        <Block containerClass="flex-row-item size-lg-6 size-md-12">
            <BlockHeading title={showLineGraph ? costEstGraphTitle : 'Pins added by operatives'} />

            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={showLineGraph ? isCEDataEmpty : isBarChartEmpty}
                containerClass="size-lg-12"
                noWhiteBackground
            >
                {showLineGraph ? (
                    <DashboardLineGraph costEstGraph={costEstGraph} />
                ) : (
                    <DashboardBarChartContainer />
                )}
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
            costEstGraph,
            costEstGraphTitle,
        },
    },
}) => ({
    isFetching: isFetchingDashPinsStats,
    error: error,
    recentPinDatasets: datasets,
    costEstGraph,
    costEstGraphTitle,
});

export default connect(mapStateToProps)(DashboardCostingCharts);
