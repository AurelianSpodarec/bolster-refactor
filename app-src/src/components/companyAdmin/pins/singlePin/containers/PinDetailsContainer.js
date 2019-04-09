import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import selectPinHistory from 'actions/companyAdmin/pins/sync/selectPinHistory';

import PinDetails from '../presentational/PinDetails';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class PinDetailsContainer extends Component {
    render() {
        const {
            selectedHistory,
            histories,
            users,
            error,
            isFetching
        } = this.props;

        const historyVersion =
            [...histories]
                .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
                .findIndex(item => item.id === selectedHistory.id) + 1;

        const user = users[selectedHistory.createdByCompanyUserID];

        return (
            <BlockContainer
                heading="Pin options"
                isEmpty={!user}
                isFetching={isFetching}
                error={error}
            >
                <PinDetails
                    pinHistory={selectedHistory}
                    historyCount={histories.length}
                    historyVersion={historyVersion}
                    user={user}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { latestHistoryId, selectPinHistory } = this.props;
        if (latestHistoryId) {
            selectPinHistory(latestHistoryId);
        }
    };

    componentDidUpdate = prevProps => {
        const { latestHistoryId, selectPinHistory } = this.props;
        if (!prevProps.latestHistoryId && latestHistoryId) {
            selectPinHistory(latestHistoryId);
        }
    };
}

const mapStateToProps = (
    { companyAdmin: { pinsReducer, pinHistoriesReducer, companyUsersReducer } },
    { match }
) => {
    const pin = pinsReducer.pins[match.params.id] || {};
    const { selectedHistoryId, histories } = pinHistoriesReducer;

    return {
        isFetching:
            pinsReducer.isFetching ||
            pinHistoriesReducer.isFetching ||
            companyUsersReducer.isFetching,
        error: pinHistoriesReducer.error,
        latestHistoryId: pin.latestHistoryID,
        selectedHistory: histories[selectedHistoryId] || {},
        histories: Object.values(histories),
        users: companyUsersReducer.users || {}
    };
};

const mapDispatchToProps = dispatch => ({
    selectPinHistory: historyId => {
        dispatch(selectPinHistory(historyId));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PinDetailsContainer)
);
