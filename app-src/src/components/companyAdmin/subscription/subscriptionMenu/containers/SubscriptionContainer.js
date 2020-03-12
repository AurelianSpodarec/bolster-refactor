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
        shouldRestrictPayments: false
    };
    render() {
        return (
            <Subscription
                shouldRestrictPayments={this.state.shouldRestrictPayments}
            />
        );
    }

    componentDidMount = () => {
        this.props.fetchSubscriptionData();
    };

    componentDidUpdate = prevProps => {
        const {
            users,
            companyUserID,
            postSuccess,
            fetchSubscriptionData
        } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            fetchSubscriptionData();
        }

        if (users && users[companyUserID] && !prevProps.users[companyUserID]) {
            this.setState({
                shouldRestrictPayments:
                    users[companyUserID].shouldRestrictPayments
            });
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        invoicesReducer,
        servicesReducer,
        cardsReducer,
        creditsReducer,
        companyUsersReducer: { users }
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { companyUserID }
        }
    }
}) => ({
    companyUserID,
    users,
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
    connect(mapStateToProps, mapDispatchToProps)(SubscriptionContainer)
);
