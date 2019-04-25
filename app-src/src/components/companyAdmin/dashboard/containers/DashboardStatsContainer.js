import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardStats from '../presentational/DashboardStats';
// import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';

class DashboardStatsContainer extends Component {
    render() {
        return <DashboardStats data={this._getChartData()} />;
    }

    _getChartData() {
        // const { pins } = this.props;
        // data needed on pins - pin type/colour, time, pin service ID
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
                label: 'red',
                borderColor: 'black',
                backgroundColor: 'red',
                stack: 'pins',
                borderWidth: 1,
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            },
            {
                label: 'green',
                borderColor: 'black',
                backgroundColor: 'green',
                stack: 'pins',
                borderWidth: 1,
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            },
            {
                label: 'blue',
                borderColor: 'black',
                backgroundColor: 'blue',
                stack: 'pins',
                borderWidth: 1,
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            },
            {
                label: 'yellow',
                borderColor: 'black',
                backgroundColor: 'yellow',
                stack: 'pins',
                borderWidth: 1,
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            },
            {
                label: 'purple',
                borderColor: 'black',
                backgroundColor: 'purple',
                stack: 'pins',
                borderWidth: 1,
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            }
        ];
        return { labels, datasets };
    }

    componentDidMount() {
        // this.props.fetchPins();
    }
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
