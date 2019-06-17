import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardStats from '../presentational/DashboardStats';
// import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';

class DashboardStatsContainer extends Component {
    render = () => (
        <DashboardStats
            data={this._getChartData()}
            options={this._getChartOptions()}
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
        const labels = [
            '00:00',
            '02:00',
            '04:00',
            '06:00',
            '08:00',
            '10:00',
            '12:00',
            '14:00',
            '16:00',
            '18:00',
            '20:00',
            '22:00'
        ];

        const datasets = [
            {
                label: 'Installed',
                borderColor: 'black',
                backgroundColor: 'green',
                stack: 'pins',
                borderWidth: 1,
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            },
            {
                label: 'Inspected',
                borderColor: 'black',
                backgroundColor: 'blue',
                stack: 'pins',
                borderWidth: 1,
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            },
            {
                label: 'No action',
                borderColor: 'black',
                backgroundColor: 'yellow',
                stack: 'pins',
                borderWidth: 1,
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            },
            {
                label: 'Action required',
                borderColor: 'black',
                backgroundColor: 'red',
                stack: 'pins',
                borderWidth: 1,
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            },
            {
                label: 'Other',
                borderColor: 'black',
                backgroundColor: 'purple',
                stack: 'pins',
                borderWidth: 1,
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
            labels,
            datasets: [...datasets]
        };
    }

    componentDidMount() {}
}

const mapStateToProps = ({
    companyAdmin: {
        pinsReducer: { pins, isFetching, error }
    }
}) => ({
    pins: Object.values(pins),
    isFetching,
    error
});

const mapDispatchToProps = dispatch => ({
    // fetchPins: () => dispatch(fetchPins(1, 1))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardStatsContainer);
