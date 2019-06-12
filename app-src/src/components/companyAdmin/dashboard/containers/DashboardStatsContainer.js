import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardStats from '../presentational/DashboardStats';
import fetchPinStats from 'actions/companyAdmin/dashboard/async/fetchPinStats';

class DashboardStatsContainer extends Component {
    state = {
        labels: [],
        datasets: []
    };

    render = () => (
        <DashboardStats
            data={this.state}
            options={this._getChartOptions()}
            isFetching={this.props.isFetching}
            pieStats={this.props.dashAllPinsStats}
        />
    );

    _getChartOptions() {
        return {
            title: {
                text: 'Number of histories added',
                display: true,
                position: 'left'
            }
        };
    }

    _getChartData() {
        // const { pins } = this.props;
        // data needed on pins - pin type/colour, time, pin service ID
        // pin colour key
        // fill empty with a grey stack?
        const { datasets, labels } = this.props;

        const myDataSets = [
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
        ];

        // const columnHeights = datasets.reduce(
        //     (acc, { data }) => acc.map((num, i) => num + data[i]),
        //     Array(12).fill(0)
        // );
        // const max = Math.max(...columnHeights);
        // const grey = {
        //     label: '',
        //     backgroundColor: 'lightgrey',
        //     stack: 'pins',
        //     data: columnHeights.map(col => max - col)
        // };
        return {
            labels: labels,
            datasets: [...myDataSets]
        };
    }

    componentDidMount = () => this.props.fetchPinStats();

    componentDidUpdate = prevProps => {
        const { datasets } = this.props;
        if (
            Object.values(datasets).length >
            Object.values(prevProps.datasets).length
        ) {
            this.setState(this._getChartData());
        }
    };
}

const mapDispatchToProps = dispatch => ({
    fetchPinStats: () => dispatch(fetchPinStats())
});

const mapStateToProps = ({
    companyAdmin: {
        dashboardReducer: {
            dashRecentPinsStats: { datasets, labels },
            dashAllPinsStats,
            isFetchingDashPinsStats,
            error
        }
    }
}) => ({
    datasets: datasets || {},
    labels: labels || {},
    dashAllPinsStats,
    isFetching: isFetchingDashPinsStats,
    error: error
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardStatsContainer);
