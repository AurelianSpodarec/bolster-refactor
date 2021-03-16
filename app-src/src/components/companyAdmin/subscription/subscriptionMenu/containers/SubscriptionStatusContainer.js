import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubscriptionStatus from '../presentational/SubscriptionStatus';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class SubscriptionStatusContainer extends Component {
    render = () => {
        const { subscriptions, isFetching, cards, shouldRestrictPayments, invoices } = this.props;
        const noCards = !Object.values(cards).length;
        const hadPendingProforma = invoices.some(({ isPaid, isRenewal }) => !isPaid && isRenewal);

        return (
            <BlockContainer isFetching={isFetching} isEmpty={isFetching}>
                <SubscriptionStatus
                    subscriptions={subscriptions}
                    noCards={noCards}
                    latestStartOn={subscriptions.nextSubscriptionStartOn}
                    endOn={subscriptions.endOn}
                    latestEndOn={subscriptions.nextSubscriptionEndOn}
                    active={!!subscriptions.startOn}
                    shouldRestrictPayments={shouldRestrictPayments}
                    hadPendingProforma={hadPendingProforma}
                    isLatest={subscriptions.isLatest}
                />
            </BlockContainer>
        );
    };
}

const mapStateToProps = ({
    companyAdmin: {
        subscriptionsReducer: { error, isFetchingSubscription, subscriptions },
        cardsReducer: { cards, isFetching: isFetchingCards },
        invoicesReducer: { invoices },
    },
}) => ({
    subscriptions,
    error,
    isFetching: isFetchingSubscription || isFetchingCards,
    cards: cards || {},
    invoices: Object.values(invoices),
});

export default connect(mapStateToProps)(SubscriptionStatusContainer);
