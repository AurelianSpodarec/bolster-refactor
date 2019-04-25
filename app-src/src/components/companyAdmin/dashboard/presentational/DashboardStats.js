import React from 'react';

import { Bar } from 'react-chartjs-2';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DashboardStatsOptionsContainer from '../containers/DashboardStatsOptionsContainer';

const DashboardStats = ({ data }) => (
    <BlockContainer>
        <div className="size-lg-12">
            <DashboardStatsOptionsContainer />
        </div>
        <div className="size-lg-6">
            <BlockHeading title="Pins added by operatives" />
            <Bar data={data} />
        </div>
        <div className="size-lg-6">
            <BlockHeading title="Data by active operatives" />
        </div>
    </BlockContainer>
);

export default DashboardStats;
