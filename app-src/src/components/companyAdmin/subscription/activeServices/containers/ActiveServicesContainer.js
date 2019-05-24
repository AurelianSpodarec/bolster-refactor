import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isObjEmpty } from 'helpers/generic';
import ActiveServices from 'components/companyAdmin/subscription/activeServices/presentational/ActiveServices';
import editServiceRenewalStatus from 'actions/companyAdmin/subscriptions/async/editServiceRenewalStatus';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';

class ActiveServicesContainer extends Component {
    state = {
        subscriptions: []
    };

    render = () => {
        const { services, subscriptions, showModal, isAutoRenew } = this.props;
        const { serviceIDs = [] } = subscriptions;
        const unsubscribedServices = Object.values(services).filter(
            service => !serviceIDs.includes(service.id)
        );

        return (
            <ActiveServices
                subscriptions={this.state.subscriptions}
                services={unsubscribedServices}
                handleChange={this.handleChange}
                showModal={showModal}
                isAutoRenew={isAutoRenew}
            />
        );
    };

    componentDidMount = () => {
        const { fetchAllSubscriptions, subscriptions } = this.props;

        if (!Object.values(subscriptions).length) {
            fetchAllSubscriptions();
        }
    };

    componentDidUpdate = prevProps => {
        const {
            isFetching,
            postSuccess,
            fetchAllSubscriptions,
            invoicePaid
        } = this.props;
        if (!isFetching && prevProps.isFetching)
            this.setState({
                subscriptions: this.getActiveSubscriptions()
            });
        if (
            (postSuccess && !prevProps.postSuccess) ||
            (invoicePaid && !prevProps.invoicePaid)
        )
            fetchAllSubscriptions();
    };

    getActiveSubscriptions = () => {
        const { subscriptions, services } = this.props;

        return subscriptions.services && !isObjEmpty(services)
            ? subscriptions.services.map(service => ({
                  ...service,
                  name: services[service.serviceID].name
              }))
            : [];
    };

    handleChange = name => {
        const { editServiceRenewalStatus } = this.props;
        const updatedServices = this.state.subscriptions.reduce((acc, curr) => {
            if (curr.name === name) {
                acc.push({ ...curr, isAutoRenew: !curr.isAutoRenew });
                const postBody = {
                    companySubscriptionServiceID: curr.id,
                    renewalStatus: !curr.isAutoRenew
                };
                editServiceRenewalStatus(postBody);
            } else acc.push(curr);
            return acc;
        }, []);
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
        invoicesReducer: { postSuccess: invoicePaid }
    }
}) => ({
    subscriptions,
    services,
    error,
    postSuccess,
    isFetching: fetchingSubscriptions || fetchingServices,
    invoicePaid,
    isAutoRenew: subscriptions.isAutoRenew
});

const mapDispatchToProps = dispatch => ({
    fetchAllSubscriptions: () => dispatch(fetchAllSubscriptions()),
    editServiceRenewalStatus: postBody =>
        dispatch(editServiceRenewalStatus(postBody)),
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActiveServicesContainer);
