import React from 'react';
import { isIE } from 'react-device-detect';

import { useConfirmDarkTheme } from 'helpers/hooks';
import useIsAdminPlus from 'hooks/useIsAdminPlus';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import DashboardPinFeedContainer from '../containers/DashboardPinFeedContainer';
import DashboardStatsFiltersContainer from '../containers/DashboardStatsFiltersContainer';
import DashboardDataByContainer from '../containers/DashboardDataByContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DashboardPinHistoryCharts from '../containers/DashboardPinHistoryCharts';
import DashboardCostingCharts from '../containers/DashboardCostingCharts';

const Dashboard = ({ isIE10, costEstGraph }) => {
    useConfirmDarkTheme('/company/profile');
    const isAdminPlus = useIsAdminPlus();

    const showLineGraph = !!costEstGraph && isAdminPlus;

    return (
        <>
            <PageHeading title="Dashboard" />
            {isIE10 ? (
                <div className="flex-row flex-wrap width-12 size-lg-12">
                    <BlockContainer
                        error="Dashboard not available on Internet Explorer 10"
                        containerClass="flex-row-item size-lg-12 size-md-12"
                    ></BlockContainer>
                </div>
            ) : (
                <>
                    <DashboardStatsFiltersContainer />
                    <div className="flex-row flex-wrap width-12 size-lg-12">
                        <DashboardCostingCharts showLineGraph={showLineGraph} />
                        <DashboardDataByContainer />
                    </div>
                    <div className="flex-row flex-wrap width-12 size-lg-12">
                        {!isIE ? (
                            <DashboardPinHistoryCharts showLineGraph={showLineGraph} />
                        ) : (
                            <BlockContainer
                                error={'Pie charts not supported on Internet Explorer'}
                                containerClass="flex-row-item size-lg-6 size-md-12"
                            />
                        )}
                        <DashboardPinFeedContainer />
                    </div>
                </>
            )}
        </>
    );
};

export default Dashboard;
