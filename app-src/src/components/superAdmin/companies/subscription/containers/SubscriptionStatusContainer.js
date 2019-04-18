import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import SubscriptionStatus from '../presentational/SubscriptionStatus';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isObjEmpty } from 'helpers/generic';

class SubscriptionStatusContainer extends Component {
    render = () => {
        const { subscription, error, isFetching } = this.props;
        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={isObjEmpty(subscription)}
            >
                <SubscriptionStatus
                    subscription={subscription}
                    endOn={subscription.endOn}
                    active={this.checkSubActive(
                        subscription.startOn,
                        subscription.endOn
                    )}
                />
            </BlockContainer>
        );
    };

    checkSubActive = (start, end) =>
        moment(start).isBefore(Date.now()) && moment(end).isAfter(Date.now());
}

const mapStateToProps = ({
    superAdmin: {
        companySubscriptionReducer: { error, isFetching, subscription }
    }
}) => ({
    subscription,
    error,
    isFetching
});

export default connect(mapStateToProps)(SubscriptionStatusContainer);
