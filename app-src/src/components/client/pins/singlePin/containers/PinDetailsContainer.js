import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import selectPinHistory from 'actions/companyAdmin/pins/sync/selectPinHistory';
// import { isObjEmpty } from 'helpers/generic';

import PinDetails from '../presentational/PinDetails';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

class PinDetailsContainer extends Component {
    render() {
        const {
            selectedHistory,
            histories,
            users,
            services,
            error,
            isFetching,
            pin
        } = this.props;

        const historyVersion =
            [...histories]
                .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
                .findIndex(item => item.id === selectedHistory.id) + 1;

        const user = users[selectedHistory.createdByCompanyUserID];

        return (
            <BlockContainer
                isEmpty={
                    !user ||
                    !Object.values(services).length ||
                    !histories.length
                }
                isFetching={isFetching}
                error={error}
            >
                <BlockHeading title="Pin Options" />
                <PinDetails
                    pinHistory={selectedHistory}
                    historyCount={histories.length}
                    historyVersion={historyVersion}
                    user={user}
                    services={services}
                    pin={pin}
                    drawingID={pin.drawingID}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { latestHistoryId, selectPinHistory } = this.props;
        if (latestHistoryId) selectPinHistory(latestHistoryId);
    };

    componentDidUpdate = prevProps => {
        const { latestHistoryId, selectPinHistory } = this.props;

        if (prevProps.latestHistoryId !== latestHistoryId) {
            selectPinHistory(latestHistoryId);
        }
    };
}

const mapStateToProps = (
    {
        client: {
            pinsReducer: { isFetching: fetchingPins, pins },
            pinHistoriesReducer: {
                histories,
                isFetching: fetchingHistories,
                error
            },
            drawingOperativesReducer: { users, isFetching: fetchingUsers },
            servicesReducer: { services }
        },
        shared: {
            selectedHistoryReducer: { selectedHistoryId }
        }
    },
    { match }
) => {
    const pin = pins[match.params.id] || {};
    return {
        isFetching: fetchingPins || fetchingHistories || fetchingUsers,
        error,
        latestHistoryId: pin.latestHistoryID,
        selectedHistory: histories[selectedHistoryId] || {},
        histories: Object.values(histories),
        users: users || {},
        services: services || {},
        pin
    };
};

const mapDispatchToProps = dispatch => ({
    selectPinHistory: historyID => dispatch(selectPinHistory(historyID))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PinDetailsContainer)
);
