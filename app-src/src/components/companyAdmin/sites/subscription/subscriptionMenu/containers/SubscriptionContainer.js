import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Subscription from '../presentational/Subscription';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import fetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';

class SubscriptionContainer extends Component {
    render = () => <Subscription />;

    componentDidMount = () => {
        this.props.fetchAllSubscriptions();
        this.props.fetchAllServices();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchAllSubscriptions: () => dispatch(fetchAllSubscriptions()),
    fetchAllServices: () => dispatch(fetchAllServices())
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(SubscriptionContainer)
);
