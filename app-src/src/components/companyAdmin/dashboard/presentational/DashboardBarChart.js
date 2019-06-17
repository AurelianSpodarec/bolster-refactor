import React from 'react';
import { Bar } from 'react-chartjs-2';

const DashboardBarChart = ({ data }) => (
    <>
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
