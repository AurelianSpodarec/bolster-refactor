import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import MySubscription from '../presentational/MySubscription';

class MySubscriptionContainer extends Component {
    render() {
        const { subscriptionEndDate, subscriptions } = this.props;

        const endDate = moment(subscriptionEndDate);
        const currentDate = moment();
        const daysleft = endDate.diff(currentDate, 'days');

        return (
            <BlockContainer>
                <MySubscription
                    services={this._servicesAvailable()}
                    daysleft={daysleft}
                    subscriptions={subscriptions}
                    endOn={subscriptions.endOn}
                />
            </BlockContainer>
        );
    }

    _getServicesOptions = () => {
        const { services, subscriptionServiceIDs } = this.props;
        return services.map(({ id, name }) => ({
            value: id,
            text: name,
            disabled: !subscriptionServiceIDs.includes(id)
        }));
    };

    _servicesAvailable = () => {
        return this._getServicesOptions().filter(
            service => service.disabled === false
        );
    };

    componentDidUpdate = () => {
        // console.log(this._servicesAvailable());
    };
}
const mapStateToProps = ({
    companyAdmin: { servicesReducer, subscriptionsReducer }
}) => ({
    services: Object.values(servicesReducer.services),
    subscriptionServiceIDs: subscriptionsReducer.subscriptions.serviceIDs || [],
    subscriptions: subscriptionsReducer.subscriptions,
    subscriptionEndDate: subscriptionsReducer.subscriptions.endOn || ''
});

export default connect(mapStateToProps)(MySubscriptionContainer);
