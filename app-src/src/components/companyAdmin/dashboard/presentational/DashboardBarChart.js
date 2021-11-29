import React from 'react';
import { Bar } from 'react-chartjs-2';

const DashboardBarChart = ({ data, isDaily }) => {
    return (
        <>
            <Bar
                data={data}
                options={{
                    scales: {
                        xAxes: [
                            {
                                time: {
                                    unit: `${isDaily ? 'day' : 'week'}`,
                                    displayFormats: {
                                        week: 'MMM D',
                                        day: 'MMM D',
                                    },
                                },
                            },
                        ],
                        yAxes: [
                            {
                                display: true,
                                ticks: {
                                    suggestedMax: 10,
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                }}
                legend={null}
            />
        </>
    );
};

export default DashboardBarChart;
