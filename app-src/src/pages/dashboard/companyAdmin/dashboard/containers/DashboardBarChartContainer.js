import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import DashboardBarChart from '../presentational/DashboardBarChart';

const DashboardBarChartContainer = () => {
    const { datasets, labels } = useSelector(mapStateToProps);

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
    return <DashboardBarChart data={data} isDaily={labels.length < 33} />;
};

const mapStateToProps = ({
    companyAdmin: {
        dashboardReducer: {
            dashRecentPinsStats: { datasets, labels },
        },
    },
}) => ({
    datasets: datasets || {},
    labels: labels || [],
});

export default DashboardBarChartContainer;
