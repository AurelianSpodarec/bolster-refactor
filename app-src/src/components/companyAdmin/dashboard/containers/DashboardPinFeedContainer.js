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

    componentWillUnmount = () => {
        clearInterval(this.interval);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        latestPinFeedReducer: { pins, isFetching, error, lastUpdatedOn }
    }
}) => ({
    pins,
    isFetching,
    error,
    lastUpdatedOn
});

const mapDispatchToProps = dispatch => ({
    fetchPinFeed: () => {
        dispatch(fetchPinFeed());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPinFeedContainer);
