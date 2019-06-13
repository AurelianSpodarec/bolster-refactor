import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

import redBarImage from '_content/images/graph-bars/red.jpg';

class DashboardBarContainer extends Component {
    state = {
        labels: [],
        datasets: []
    };

    _data = canvas => {
        const { datasets, labels } = this.props;

        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.src = redBarImage;

        const gradient = ctx.createPattern(img, 'repeat-y');
        // gradient.addColorStop(0, 'pink');
        // gradient.addColorStop(1, 'orange');
        return {
            labels: labels || [],
            datasets: [
                {
                    label: 'Action required',
                    borderColor: 'black',
                    backgroundColor: 'red',
                    stack: 'pins',
                    borderWidth: 1,
                    data: datasets.ActionRequired
                },
                {
                    label: 'Inspected',
                    borderColor: 'black',
                    backgroundColor: 'blue',
                    stack: 'pins',
                    borderWidth: 1,
                    data: datasets.Inspected
                },
                {
                    label: 'Installed',
                    borderColor: 'black',
                    backgroundColor: 'green',
                    stack: 'pins',
                    borderWidth: 1,
                    data: datasets.Installed
                },
                {
                    label: 'No action required',
                    borderColor: 'black',
                    backgroundColor: 'yellow',
                    stack: 'pins',
                    borderWidth: 1,
                    data: datasets.NoAction
                },
                {
                    label: 'Other',
                    borderColor: 'black',
                    backgroundColor: 'purple',
                    stack: 'pins',
                    borderWidth: 1,
                    data: datasets.Other
                }
            ]
        };
    };

    render() {
        return <Bar data={this._data} labels={this.labels} />;
    }
}
export default DashboardBarContainer;
