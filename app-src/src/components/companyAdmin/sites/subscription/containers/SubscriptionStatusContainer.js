import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import SubscriptionStatus from '../presentational/SubscriptionStatus';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isObjEmpty } from 'helpers/generic';

class SubscriptionStatusContainer extends Component {
    render = () => {
        const { subscriptions, error, isFetching } = this.props;
        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={isObjEmpty(subscriptions)}
            >
                <SubscriptionStatus
                    subscriptions={subscriptions}
                    active={this.checkSubActive()}
                />
            </BlockContainer>
        );
    };

    checkSubActive = (start, end) =>
        moment(start).isBefore(Date.now()) && moment(end).isAfter(Date.now());
}

const mapStateToProps = ({
    companyAdmin: {
        subscriptionsReducer: { error, isFetching, subscriptions }
    }
}) => ({
    subscriptions,
    error,
    isFetching
});

export default connect(mapStateToProps)(SubscriptionStatusContainer);
