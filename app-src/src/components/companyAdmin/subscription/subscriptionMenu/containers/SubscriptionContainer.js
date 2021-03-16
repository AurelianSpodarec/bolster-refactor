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
    state = {
        shouldRestrictPayments: false,
    };
    render() {
        return (
            <Subscription
                shouldRestrictPayments={this.state.shouldRestrictPayments}
                subscription={this.props.subscription}
            />
        );
    }

    componentDidMount = () => {
        const { users, companyUserID } = this.props;
        this.props.fetchSubscriptionData();
        if (users && users[companyUserID]) {
            this.setState({
                shouldRestrictPayments: users[companyUserID].shouldRestrictPayments,
            });
        }
    };

    componentDidUpdate = prevProps => {
        const {
            users,
            companyUserID,
            postSuccess,
            fetchSubscriptionData,
            subscription,
            fetchInvoices,
        } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            fetchSubscriptionData();
        }

        if (users && users[companyUserID] && !prevProps.users[companyUserID]) {
            this.setState({
                shouldRestrictPayments: users[companyUserID].shouldRestrictPayments,
            });
        }

        if (subscription !== prevProps.subscription) {
            setTimeout(fetchInvoices, 600);
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        invoicesReducer,
        servicesReducer,
        cardsReducer,
        creditsReducer,
        companyUsersReducer: { users },
        subscriptionsReducer: { subscriptions },
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { companyUserID },
        },
    },
}) => ({
    companyUserID,
    users,
    postSuccess:
        invoicesReducer.postSuccess ||
        servicesReducer.postSuccess ||
        cardsReducer.postSuccess ||
        creditsReducer.postSuccess,
    subscription: subscriptions,
});

const mapDispatchToProps = dispatch => ({
    fetchSubscriptionData: () => {
        dispatch(fetchAllSubscriptions());
        dispatch(fetchAllServices());
        dispatch(fetchAllInvoices());
        dispatch(fetchAllCards());
        dispatch(fetchAllCredits());
        dispatch(fetchCostOfCredits());
    },
    fetchInvoices: () => {
        dispatch(fetchAllInvoices());
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubscriptionContainer));
