import React from 'react';

import { Bar } from 'react-chartjs-2';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PieChart from 'components/shared/stats/presentational/PieChart';
import DashboardBarContainer from '../containers/DashboardBarContainer';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const DashboardStats = ({
    data,
    options,
    pieStats,
    isFetching,
    datasets,
    labels
}) => (
    <BlockContainer>
        {isFetching ? (
            <Loading message="Loading stats..." />
        ) : (
            <>
                <div className="size-lg-6">
                    <BlockHeading title="Pins added by operatives" />
                    <Bar data={data} options={options} />
                    {/* <DashboardBarContainer datasets={datasets} labels={labels} /> */}
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
            </>
        )}
    </BlockContainer>
);

export default DashboardStats;
