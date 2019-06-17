import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchPinFeed from 'actions/companyAdmin/pins/async/fetchPinFeed';
import DashboardPinFeed from '../presentational/DashboardPinFeed';

class DashboardPinFeedContainer extends Component {
    render() {
        const { pins, isFetching, error } = this.props;

        return (
            <DashboardPinFeed
                pins={pins}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    componentDidMount = () => {
        const { fetchPinFeed, lastUpdatedOn } = this.props;
        fetchPinFeed();

        this.interval = setInterval(() => fetchPinFeed(lastUpdatedOn), 10000);
    };

    componentDidUpdate = prevProps => {
        const { pins } = this.props;

        if (prevProps.pins.length < 1 && !!pins.length) {
            console.warn('you did it');
        }
    };

    componentWillUnmount = () => {
        clearInterval(this.interval);
    };

    _sortPins = () => {
        const { pins } = this.props;

        const pinsArray = [...pins].sort((a, b) => b.syncedOn - a.syncedOn);

        return pinsArray.length > 6 ? pinsArray.slice(0, 6) : pinsArray;
    };
}

const mapStateToProps = ({
    companyAdmin: {
        latestPinFeedReducer: { pins, isFetching, error, lastUpdatedOn }
    }
}) => ({
    pins: pins || [],
    isFetching,
    error,
    lastUpdatedOn
});

const mapDispatchToProps = dispatch => ({
    fetchPinFeed: () => dispatch(fetchPinFeed())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPinFeedContainer);
