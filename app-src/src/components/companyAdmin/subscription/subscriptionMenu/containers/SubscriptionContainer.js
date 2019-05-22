import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Subscription from '../presentational/Subscription';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import fetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';
import fetchAllCards from 'actions/companyAdmin/cards/async/fetchAllCards';
import fetchAllCredits from 'actions/companyAdmin/credits/fetchAllCredits';
import fetchCostOfCredits from 'actions/companyAdmin/credits/fetchCostOfCredits';

class SubscriptionContainer extends Component {
    render = () => <Subscription />;

    componentDidMount = () => {
        this.props.fetchSubscriptionData();
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, fetchSubscriptionData } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            fetchSubscriptionData();
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        invoicesReducer,
        servicesReducer,
        cardsReducer,
        creditsReducer
    }
}) => ({
    postSuccess:
        invoicesReducer.postSuccess ||
        servicesReducer.postSuccess ||
        cardsReducer.postSuccess ||
        creditsReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchSubscriptionData: () => {
        dispatch(fetchAllSubscriptions());
        dispatch(fetchAllServices());
        dispatch(fetchAllInvoices());
        dispatch(fetchAllCards());
        dispatch(fetchAllCredits());
        dispatch(fetchCostOfCredits());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SubscriptionContainer)
);
