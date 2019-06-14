import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

// import redBarImage from '_content/images/graph-bars/red.jpg';

class DashboardBarContainer extends Component {
    state = {
        labels: [],
        datasets: []
    };

    _data = () => {
        const { datasets, labels } = this.props;

        // const ctx = canvas.getContext('2d');
        // const img = new Image();

        // img.src = redBarImage;

        // const gradient = ctx.createLinearGradient(0.0, 100.0, 300.0, 100.0);

        // // Add colors
        // gradient.addColorStop(0.0, 'rgba(215, 26, 27, 1.000)');
        // // gradient.addColorStop(0.151, 'rgba(215, 26, 27, 1.000)');
        // // gradient.addColorStop(0.151, 'rgba(215, 59, 57, 1.000)');
        // // gradient.addColorStop(0.411, 'rgba(215, 59, 57, 1.000)');
        // // gradient.addColorStop(0.414, 'rgba(223, 61, 61, 1.000)');
        // gradient.addColorStop(1, 'rgba(250, 60, 250, 1.000)');
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Action required',
                    backgroundColor: '#d61b1a',
                    stack: 'pins',
                    data: datasets.ActionRequired
                },
                {
                    label: 'Installed',
                    backgroundColor: '#2cab56',
                    // backgroundColor: 'green',
                    stack: 'pins',
                    data: datasets.Installed
                },
                {
                    label: 'Inspected',
                    backgroundColor: '#3363dd',
                    // backgroundColor: 'blue',
                    stack: 'pins',
                    data: datasets.Inspected
                },
                {
                    label: 'No action required',
                    backgroundColor: '#efc209',
                    // backgroundColor: 'yellow',
                    stack: 'pins',
                    data: datasets.NoAction
                },
                {
                    label: 'Other',
                    backgroundColor: '#800180',
                    // backgroundColor: 'purple',
                    stack: 'pins',
                    data: datasets.Other
                }
            ]
        };
    };

    render() {
        return (
            <Bar
                data={this._data}
                options={{
                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                suggestedMax: 10,
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />);
    }
}
export default DashboardBarContainer;
