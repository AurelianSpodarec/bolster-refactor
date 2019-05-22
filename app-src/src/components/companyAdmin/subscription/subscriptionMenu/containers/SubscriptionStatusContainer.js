import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import SubscriptionStatus from '../presentational/SubscriptionStatus';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class SubscriptionStatusContainer extends Component {
    render = () => {
        const { subscriptions, isFetching, cards } = this.props;
        const noCards = !Object.values(cards).length;

        return (
            <BlockContainer isFetching={isFetching}>
                <SubscriptionStatus
                    subscriptions={subscriptions}
                    noCards={noCards}
                    endOn={subscriptions.endOn}
                    active={this.checkSubActive(
                        subscriptions.startOn,
                        subscriptions.endOn
                    )}
                />
            </BlockContainer>
        );
    };

    checkSubActive = (start, end) =>
        moment(start).isBefore(Date.now()) && moment(end).isAfter(Date.now());
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
