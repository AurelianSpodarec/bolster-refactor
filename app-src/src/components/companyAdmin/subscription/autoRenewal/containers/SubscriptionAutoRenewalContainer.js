import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubscriptionAutoRenewal from '../presentational/SubscriptionAutoRenewal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import editSubscriptionRenewalStatus from 'actions/companyAdmin/subscriptions/async/editSubscriptionRenewalStatus';

class SubscriptionAutoRenewalContainer extends Component {
    render() {
        const { isFetching, isAutoRenew } = this.props;
        return (
            <BlockContainer isFetching={isFetching}>
                <SubscriptionAutoRenewal
                    isAutoRenew={isAutoRenew}
                    handleAutoRenewChange={this.handleAutoRenewChange}
                />
            </BlockContainer>
        );
    }

    handleAutoRenewChange = () => {
        console.log('firing');
        const { editSubscriptionRenewalStatus, isAutoRenew } = this.props;
        editSubscriptionRenewalStatus({ renewalStatus: !isAutoRenew });
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

const mapDispatchToProps = dispatch => ({
    editSubscriptionRenewalStatus: body =>
        dispatch(editSubscriptionRenewalStatus(body))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionAutoRenewalContainer);
