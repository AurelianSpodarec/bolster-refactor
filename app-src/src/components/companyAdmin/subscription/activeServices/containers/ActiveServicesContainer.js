import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isObjEmpty } from 'helpers/generic';
import ActiveServices from 'components/companyAdmin/subscription/activeServices/presentational/ActiveServices';
import editServiceRenewalStatus from 'actions/companyAdmin/subscriptions/async/editServiceRenewalStatus';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import editSubscriptionRenewalStatus from 'actions/companyAdmin/subscriptions/async/editSubscriptionRenewalStatus';

class ActiveServicesContainer extends Component {
    state = { subscriptions: [] };

    render = () => {
        const {
            services,
            subscriptions,
            showModal,
            isAutoRenew,
            cards
        } = this.props;
        const { serviceIDs = [] } = subscriptions;
        const unsubscribedServices = Object.values(services).filter(
            ({ id }) => !serviceIDs.includes(id)
        );

        return (
            <ActiveServices
                subscriptions={this.state.subscriptions}
                services={unsubscribedServices}
                handleChange={this.handleChange}
                showModal={showModal}
                isAutoRenew={isAutoRenew}
                noCards={!cards.length}
            />
        );
    };

    componentDidMount = () => this.props.fetchAllSubscriptions();

    componentDidUpdate = prevProps => {
        const {
            isFetching,
            postSuccess,
            fetchAllSubscriptions,
            invoicePaid
        } = this.props;
        const subscriptions = this.getActiveSubscriptions();
        if (!isFetching && prevProps.isFetching) {
            this.setState({ subscriptions });
        }
        if (
            (postSuccess && !prevProps.postSuccess) ||
            (invoicePaid && !prevProps.invoicePaid)
        ) {
            fetchAllSubscriptions();
        }
    };

    getActiveSubscriptions = () => {
        const { subscriptions, services } = this.props;
        if (subscriptions.services && !isObjEmpty(services)) {
            return subscriptions.services.map(service => ({
                ...service,
                name: services[service.serviceID].name
            }));
        } else return [];
    };

    handleChange = name => {
        const {
            editServiceRenewalStatus
            // editSubscriptionRenewalStatus
        } = this.props;
        const updatedServices = this.state.subscriptions.reduce((acc, curr) => {
            if (curr.name === name) {
                const postBody = {
                    companySubscriptionServiceID: curr.id,
                    renewalStatus: !curr.isAutoRenew
                };
                editServiceRenewalStatus(postBody);
                return [...acc, { ...curr, isAutoRenew: !curr.isAutoRenew }];
            } else return [...acc, curr];
        }, []);
        // if (updatedServices.every(({ isAutoRenew }) => !isAutoRenew)) {
        //     editSubscriptionRenewalStatus({ renewalStatus: false });
        // }
        this.setState({ subscriptions: updatedServices });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        subscriptionsReducer: {
            error,
            isFetching: fetchingSubscriptions,
            subscriptions,
            postSuccess
        },
        servicesReducer: { services, isFetching: fetchingServices },
        invoicesReducer: { postSuccess: invoicePaid },
        cardsReducer: { cards }
    }
}) => ({
    subscriptions,
    services,
    cards: Object.values(cards),
    error,
    postSuccess,
    isFetching: fetchingSubscriptions || fetchingServices,
    invoicePaid,
    isAutoRenew: subscriptions.isAutoRenew
});

const mapDispatchToProps = {
    fetchAllSubscriptions,
    editServiceRenewalStatus,
    showModal,
    editSubscriptionRenewalStatus
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActiveServicesContainer);
