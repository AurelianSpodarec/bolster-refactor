import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Subscription from '../presentational/Subscription';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import fetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';
import fetchAllCards from 'actions/companyAdmin/cards/async/fetchAllCards';
import fetchAllCredits from 'actions/companyAdmin/credits/fetchAllCredits';

class SubscriptionContainer extends Component {
    render = () => <Subscription />;

    componentDidMount = () => {
        this.props.fetchSubscriptionData();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchSubscriptionData: () => {
        dispatch(fetchAllSubscriptions());
        dispatch(fetchAllServices());
        dispatch(fetchAllInvoices());
        dispatch(fetchAllCards());
        dispatch(fetchAllCredits());
    }
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(SubscriptionContainer)
);
