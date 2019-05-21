import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubscriptionAutoRenewal from '../presentational/SubscriptionAutoRenewal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import editSubscriptionRenewalStatus from 'actions/companyAdmin/subscriptions/async/editSubscriptionRenewalStatus';

class SubscriptionAutoRenewalContainer extends Component {
    render() {
        const { isFetching, isAutoRenew, renewalType } = this.props;
        const noCards = !Object.values(this.props.cards).length;

        return (
            <BlockContainer isFetching={isFetching}>
                <SubscriptionAutoRenewal
                    isAutoRenew={isAutoRenew}
                    handleAutoRenewChange={this.handleAutoRenewChange}
                    handleRadioChange={this.handleRadioChange}
                    renewalType={renewalType}
                    noCards={noCards}
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
}

const mapStateToProps = ({
    companyAdmin: {
        subscriptionsReducer: {
            isFetching,
            subscriptions: { isAutoRenew, renewalType }
        },
        cardsReducer: { cards }
    }
}) => ({
    isFetching,
    isAutoRenew,
    renewalType,
    cards: cards || {}
});

const mapDispatchToProps = dispatch => ({
    editSubscriptionRenewalStatus: body =>
        dispatch(editSubscriptionRenewalStatus(body))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionAutoRenewalContainer);
