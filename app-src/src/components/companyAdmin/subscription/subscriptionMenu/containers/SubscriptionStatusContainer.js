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
                    endOn={subscriptions.endOn}
                    active={!!subscriptions.startOn}
                    shouldRestrictPayments={shouldRestrictPayments}
                    hadPendingProforma={hadPendingProforma}
                />
            </BlockContainer>
        );
    };
}

const mapStateToProps = ({
    companyAdmin: {
        subscriptionsReducer: { error, isFetching, subscriptions },
        cardsReducer: { cards },
        invoicesReducer: { invoices },
    },
}) => ({
    subscriptions,
    error,
    isFetching,
    cards: cards || {},
    invoices: Object.values(invoices),
});

export default connect(mapStateToProps)(SubscriptionStatusContainer);
