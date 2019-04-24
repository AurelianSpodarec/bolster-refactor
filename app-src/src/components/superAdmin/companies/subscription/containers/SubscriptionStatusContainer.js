import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import SubscriptionStatus from '../presentational/SubscriptionStatus';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class SubscriptionStatusContainer extends Component {
    render = () => {
        const { subscription, services } = this.props;
        return (
            <BlockContainer>
                <SubscriptionStatus
                    subscription={subscription}
                    services={services}
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
        companySubscriptionReducer: { isFetching, subscription },
        servicesReducer: { services, isFetching: fetchingServices }
    }
}) => ({
    subscription,
    isFetching,
    services,
    fetchingServices
});

export default connect(mapStateToProps)(SubscriptionStatusContainer);
