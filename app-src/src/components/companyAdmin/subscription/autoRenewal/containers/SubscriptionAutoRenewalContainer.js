import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import SubscriptionAutoRenewal from '../presentational/SubscriptionAutoRenewal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import editSubscriptionRenewalStatus from 'actions/companyAdmin/subscriptions/async/editSubscriptionRenewalStatus';

class SubscriptionAutoRenewalContainer extends Component {
    render() {
        const {
            isFetching,
            isAutoRenew,
            renewalType,
            subscriptions,
            cards
        } = this.props;
        const noCards = !cards.length;

        return (
            <BlockContainer isFetching={isFetching}>
                <SubscriptionAutoRenewal
                    isAutoRenew={isAutoRenew}
                    handleAutoRenewChange={this.handleAutoRenewChange}
                    handleRadioChange={this.handleRadioChange}
                    renewalType={renewalType}
                    noCards={noCards}
                    active={this.checkSubActive(
                        subscriptions.startOn,
                        subscriptions.endOn
                    )}
                />
            </BlockContainer>
        );
    }

    handleAutoRenewChange = () => {
        const {
            editSubscriptionRenewalStatus,
            isAutoRenew,
            renewalType
        } = this.props;
        editSubscriptionRenewalStatus({
            renewalStatus: !isAutoRenew,
            renewPaymentType: renewalType
        });
    };

    handleRadioChange = (_, value) => {
        const {
            editSubscriptionRenewalStatus,
            isAutoRenew: renewalStatus
        } = this.props;
        // switch between pay using card, pay by invoice
        editSubscriptionRenewalStatus({
            renewalStatus,
            renewPaymentType: value
        });
    };
    checkSubActive = (start, end) =>
        moment(start).isBefore(Date.now()) && moment(end).isAfter(Date.now());
}

const mapStateToProps = ({
    companyAdmin: {
        subscriptionsReducer: { isFetching, subscriptions },
        cardsReducer: { cards }
    }
}) => ({
    isFetching,
    isAutoRenew: subscriptions.isAutoRenew,
    renewalType: subscriptions.renewalType,
    subscriptions,
    cards: Object.values(cards)
});

const mapDispatchToProps = dispatch => ({
    editSubscriptionRenewalStatus: body =>
        dispatch(editSubscriptionRenewalStatus(body))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionAutoRenewalContainer);
