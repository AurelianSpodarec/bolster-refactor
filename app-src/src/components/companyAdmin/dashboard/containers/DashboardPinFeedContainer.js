import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchPinFeed from 'actions/companyAdmin/pins/async/fetchPinFeed';
import DashboardPinFeed from '../presentational/DashboardPinFeed';

class DashboardPinFeedContainer extends Component {
    render() {
        // const { pins } = this.props;

        return <DashboardPinFeed />;
    }

    componentDidMount = () => {
        // const { fetchPinFeed } = this.props;
        //fetchPinFeed();
    };
}

const mapStateToProps = ({ companyAdmin: { pinsReducer: pins } }) => ({
    pins
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
