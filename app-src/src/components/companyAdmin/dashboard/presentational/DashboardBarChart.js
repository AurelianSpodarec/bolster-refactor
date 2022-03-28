import useColourTheme from 'hooks/useColourTheme';
import React from 'react';
import { Bar } from 'react-chartjs-2';

const DashboardBarChart = ({ data, isDaily }) => {
    const colourTheme = useColourTheme();
    return (
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

                            ticks: {
                                fontColor: colourTheme === 'dark' ? 'white' : '#212228',
                            },

                            gridLines: {
                                color: colourTheme === 'dark' ? '#494c5b' : '#F2F2F2',
                                zeroLineColor: colourTheme === 'dark' ? '#494c5b' : '#F2F2F2',
                            },
                        },
                    ],
                    yAxes: [
                        {
                            display: true,
                            ticks: {
                                suggestedMax: 10,
                                beginAtZero: true,
                                fontColor: colourTheme === 'dark' ? 'white' : '#212228',
                            },

                            gridLines: {
                                color: colourTheme === 'dark' ? '#494c5b' : '#F2F2F2',
                                zeroLineColor: colourTheme === 'dark' ? '#494c5b' : '#F2F2F2',
                            },
                        },
                    ],
                },
            }}
            legend={null}
        />
    );
};

export default DashboardBarChart;
