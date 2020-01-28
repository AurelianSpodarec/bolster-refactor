import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { isEmpty } from 'helpers/generic';

export default function(ProtectedComponent) {
    class WithSubscriptionAuth extends React.Component {
        render() {
            const { hasInitiallyFetched } = this.props;

            if (!hasInitiallyFetched) return null;
            if (!this._isSubscribed()) return <Redirect to="/company/subscription" />;

            return <ProtectedComponent {...this.props} />;
        }

        _isSubscribed = () => {
            const {
                subscriptions,
                subscriptions: { startOn },
            } = this.props;
            if (isEmpty(subscriptions)) return false;
            // only fetching
            return !!startOn;
        };
    }

    const mapStateToProps = ({
        companyAdmin: {
            subscriptionsReducer: { hasInitiallyFetched, subscriptions },
        },
    }) => ({
        hasInitiallyFetched,
        subscriptions,
    });
    return connect(mapStateToProps)(WithSubscriptionAuth);
}
