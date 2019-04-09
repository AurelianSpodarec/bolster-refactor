import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubscriptionAutoRenewal from '../presentational/SubscriptionAutoRenewal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import editSubscriptionRenewalStatus from 'actions/companyAdmin/subscriptions/async/editSubscriptionRenewalStatus';

class SubscriptionAutoRenewalContainer extends Component {
    render() {
        const { isFetching, isAutoRenew, renewalType } = this.props;
        return (
            <BlockContainer isFetching={isFetching}>
                <SubscriptionAutoRenewal
                    isAutoRenew={isAutoRenew}
                    handleAutoRenewChange={this.handleAutoRenewChange}
                    handleRadioChange={this.handleRadioChange}
                    renewalType={renewalType}
                />
            </BlockContainer>
        );
    }

    handleAutoRenewChange = () => {
        const { editSubscriptionRenewalStatus, isAutoRenew } = this.props;
        editSubscriptionRenewalStatus({ renewalStatus: !isAutoRenew });
    };

    handleRadioChange = ({ target: { value } }) => {
        const { editSubscriptionRenewalStatus, isAutoRenew } = this.props;
        // switch between pay using card, pay by invoice
        editSubscriptionRenewalStatus({
            isAutoRenew,
            renewPaymentType: value
        });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        subscriptionsReducer: {
            isFetching,
            subscriptions: { isAutoRenew, renewalType }
        }
    }
}) => ({
    isFetching,
    isAutoRenew,
    renewalType
});

const mapDispatchToProps = dispatch => ({
    editSubscriptionRenewalStatus: body =>
        dispatch(editSubscriptionRenewalStatus(body))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionAutoRenewalContainer);
