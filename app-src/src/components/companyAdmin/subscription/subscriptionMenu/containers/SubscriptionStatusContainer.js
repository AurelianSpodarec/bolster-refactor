import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubscriptionStatus from '../presentational/SubscriptionStatus';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class SubscriptionStatusContainer extends Component {
    render = () => {
        const {
            subscriptions,
            isFetching,
            cards,
            shouldRestrictPayments
        } = this.props;
        const noCards = !Object.values(cards).length;

        return (
            <BlockContainer isFetching={isFetching}>
                <SubscriptionStatus
                    subscriptions={subscriptions}
                    noCards={noCards}
                    endOn={subscriptions.endOn}
                    active={!!subscriptions.startOn}
                    shouldRestrictPayments={shouldRestrictPayments}
                />
            </BlockContainer>
        );
    };
}

const mapStateToProps = ({
    companyAdmin: {
        subscriptionsReducer: { error, isFetching, subscriptions },
        cardsReducer: { cards }
    }
}) => ({
    subscriptions,
    error,
    isFetching,
    cards: cards || {}
});

export default connect(mapStateToProps)(SubscriptionStatusContainer);
