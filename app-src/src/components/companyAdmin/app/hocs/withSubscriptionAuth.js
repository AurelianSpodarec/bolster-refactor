import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import { isEmpty } from 'helpers/generic';

export default function(ProtectedComponent) {
    class WithSubscriptionAuth extends React.Component {
        render() {
            const { hasInitiallyFetched } = this.props;

            if (!hasInitiallyFetched) return null;
            if (!this._isSubscribed())
                return <Redirect to="/company/subscription" />;

            console.log('subscribed!!');
            console.log('subscribed!!');
            console.log('subscribed!!');
            console.log('subscribed!!');
            console.log('subscribed!!');
            console.log('subscribed!!');
            console.log('subscribed!!');
            return <ProtectedComponent {...this.props} />;
        }

        _isSubscribed = () => {
            const {
                subscriptions,
                subscriptions: { startOn, endOn }
            } = this.props;
            if (isEmpty(subscriptions)) return false;

            return (
                moment(startOn).isBefore(Date.now()) &&
                moment(endOn).isAfter(Date.now())
            );
        };
    }

    const mapStateToProps = ({
        companyAdmin: {
            subscriptionsReducer: { hasInitiallyFetched, subscriptions }
        }
    }) => ({
        hasInitiallyFetched,
        subscriptions
    });
    return connect(mapStateToProps)(WithSubscriptionAuth);
}
