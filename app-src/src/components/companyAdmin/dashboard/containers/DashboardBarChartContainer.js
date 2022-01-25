import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DashboardBarChart from '../presentational/DashboardBarChart';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

import { isEmpty } from 'helpers/generic';
import Block from 'components/shared/generic/block/presentational/Block';

const DashboardBarContainer = () => {
    const { isFetching, error, datasets, labels } = useSelector(mapStateToProps);

    const data = useMemo(() => {
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Action required',
                    backgroundColor: '#d61b1a',
                    stack: 'pins',
                    data: datasets.ActionRequired,
                },
                {
                    label: 'Installed',
                    backgroundColor: '#2cab56',
                    stack: 'pins',
                    data: datasets.Installed,
                },
                {
                    label: 'Inspected',
                    backgroundColor: '#3363dd',
                    stack: 'pins',
                    data: datasets.Inspected,
                },
                {
                    label: 'No action',
                    backgroundColor: '#efc209',
                    stack: 'pins',
                    data: datasets.NoAction,
                },
                {
                    label: 'Other',
                    backgroundColor: '#800180',
                    stack: 'pins',
                    data: datasets.Other,
                },
            ],
        };
    }, [labels, datasets]);
    return (
        <>
            <Block containerClass="flex-row-item size-lg-6 size-md-12">
                <BlockHeading title="Pins added by operatives" />
                <BlockContainer
                    isFetching={isFetching}
                    error={error}
                    isEmpty={isEmpty(datasets) || isEmpty(labels)}
                    containerClass="size-lg-12"
                    noWhiteBackground
                >
                    <DashboardBarChart data={data} isDaily={labels.length < 33} />
                </BlockContainer>
            </Block>
        </>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        dashboardReducer: {
            dashRecentPinsStats: { datasets, labels },
            isFetchingDashPinsStats,
            error,
        },
    },
}) => ({
    datasets: datasets || {},
    labels: labels || [],
    isFetching: isFetchingDashPinsStats,
    error,
});

export default DashboardBarContainer;
