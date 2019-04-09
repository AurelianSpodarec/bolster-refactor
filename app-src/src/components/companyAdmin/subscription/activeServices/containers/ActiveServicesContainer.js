import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isObjEmpty } from 'helpers/generic';
import ActiveServices from 'components/companyAdmin/subscription/activeServices/presentational/ActiveServices';

class ActiveServicesContainer extends Component {
    state = {
        subscriptions: []
    };

    render() {
        const { subscriptions } = this.state;

        return (
            <ActiveServices
                subscriptions={subscriptions}
                handleChange={this.handleChange}
            />
        );
    }

    componentDidMount = () => {};

    componentDidUpdate = prevProps => {
        if (!this.props.isFetching && prevProps.isFetching)
            this.setState({
                subscriptions: this.getActiveSubscriptions()
            });
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

    handleChange = () => {};
}

const mapStateToProps = ({
    companyAdmin: {
        subscriptionsReducer: { error, isFetching, subscriptions },
        servicesReducer: { services }
    }
}) => ({
    subscriptions,
    services,
    error,
    isFetching
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActiveServicesContainer);
