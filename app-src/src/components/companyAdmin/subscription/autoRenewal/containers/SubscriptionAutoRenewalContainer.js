import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubscriptionAutoRenewal from '../presentational/SubscriptionAutoRenewal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class SubscriptionAutoRenewalContainer extends Component {
    render() {
        const { isFetching, isAutoRenew } = this.props;
        return (
            <BlockContainer isFetching={isFetching}>
                <SubscriptionAutoRenewal isAutoRenew={isAutoRenew} />
            </BlockContainer>
        );
    }

    handleAutoRenewChange = e => {
        e.preventDefault();
        // dispatch the auto renew action
    };

    handleRadioChange = e => {
        e.preventDefault();
        // switch between pay using card, pay by invoice
    };
}

const mapStateToProps = ({
    companyAdmin: {
        subscriptionsReducer: {
            isFetching,
            subscriptions: { isAutoRenew }
        }
    }
}) => ({
    isFetching,
    isAutoRenew
});

export default connect(mapStateToProps)(SubscriptionAutoRenewalContainer);
