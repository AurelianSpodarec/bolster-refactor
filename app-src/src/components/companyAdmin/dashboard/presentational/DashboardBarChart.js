import React from 'react';
import { Bar } from 'react-chartjs-2';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DashboardBarChart = ({ data }) => (
    <>
        <BlockHeading title="Pins added by operatives" />
        <Bar
            data={data}
            options={{
                scales: {
                    yAxes: [
                        {
                            display: true,
                            ticks: {
                                suggestedMax: 10,
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }}
            legend={null}
        />
    </>
);

export default DashboardBarChart;
