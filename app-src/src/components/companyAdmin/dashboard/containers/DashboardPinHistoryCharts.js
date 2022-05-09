import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { isIE } from 'react-device-detect';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import DashboardPieChartContainer from './DashboardPieChartContainer';
import DashboardBarChartContainer from './DashboardBarChartContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { selectIsCostingEnabled } from 'selectors/companyAdmin/companySettings';

const DashboardPinHistoryCharts = ({ isFetching, error, datasets }) => {
    const [selectedTab, setSelectedTab] = useState('pie');
    const isCostingEnabled = useSelector(selectIsCostingEnabled);
    return !isIE ? (
        <BlockContainer
            isFetching={isFetching}
            error={error}
            isEmpty={isEmpty(datasets)} // TODO - might need extra logic
            containerClass="flex-row-item size-lg-6 size-md-12"
        >
            <BlockHeading title="All Pin Histories" />
            {isCostingEnabled && (
                <ButtonWrapper alignment="right">
                    <ActionButton
                        icon="chart-pie"
                        source="secondary"
                        ambient={selectedTab === 'pie' ? 'positive' : 'primary'}
                        onClick={() => setSelectedTab('pie')}
                    ></ActionButton>
                    <ActionButton
                        icon="chart-bar"
                        source="secondary"
                        ambient={selectedTab === 'bar' ? 'positive' : 'primary'}
                        onClick={() => setSelectedTab('bar')}
                    ></ActionButton>
                </ButtonWrapper>
            )}
            {selectedTab === 'pie' ? (
                <DashboardPieChartContainer />
            ) : (
                <DashboardBarChartContainer />
            )}
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

export default connect(mapStateToProps)(DashboardPinHistoryCharts);
