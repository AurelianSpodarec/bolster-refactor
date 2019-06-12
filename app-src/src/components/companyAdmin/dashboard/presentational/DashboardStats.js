import React from 'react';

import { Bar } from 'react-chartjs-2';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PieChart from 'components/shared/stats/presentational/PieChart';

const DashboardStats = ({ data, options, pieStats, isFetching }) => (
    <BlockContainer>
        <div className="size-lg-6">
            <BlockHeading title="Pins added by operatives" />
            <Bar data={data} options={options} />
        </div>
        <div className="size-lg-6">
            <BlockHeading title="All Pin Histories" />
            <BlockContainer
                noWhiteBackground
                isFetching={isFetching}
                isEmpty={!pieStats.statuses}
            >
                <div className="size-lg-12 stats dashbaord">
                    <PieChart
                        stats={pieStats}
                        sizeClasses="size-lg-12"
                        hierarchyType="Company"
                        wTitle={false}
                    />
                </div>
            </BlockContainer>
        </div>
    </BlockContainer>
);

export default DashboardStats;
