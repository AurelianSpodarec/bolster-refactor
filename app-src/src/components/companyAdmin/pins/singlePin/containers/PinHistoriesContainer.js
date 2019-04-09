import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PinHistoriesList from '../presentational/PinHistoriesList';

class PinHistoriesContainer extends Component {
    render() {
        const {
            pin,
            users,
            services,
            histories,
            selectedHistoryId,
            isFetching,
            error
        } = this.props;

        const otherHistories = histories.filter(
            hist => hist.id !== selectedHistoryId
        );

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={
                    !pin.id ||
                    Object.values(users).length < 1 ||
                    Object.values(services).length < 1
                }
                contentClass="pin-single-history no-horizontal-padding"
            >
                <PinHistoriesList
                    otherHistories={otherHistories}
                    historyCount={histories.length}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer,
            companyUsersReducer: { users },
            servicesReducer: { services },
            pinHistoriesReducer: { histories }
        }
    },
    { match }
) => {
    const pin = pinsReducer.pins[match.params.id] || {};

    return {
        isFetching: pinsReducer.isFetching,
        error: pinsReducer.error,
        pin: pin,
        users: users || {},
        services: services || {},
        histories: Object.values(histories) || {},
        selectedHistoryId: pin.latestHistoryID
    };
};

export default withRouter(connect(mapStateToProps)(PinHistoriesContainer));
