import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import selectPinHistory from 'actions/pins/sync/selectPinHistory';

import PinDetails from '../presentational/PinDetails';
class PinDetailsContainer extends Component {
    render() {
        const { selectedHistory, histories } = this.props;

        const historyVersion =
            histories.findIndex(item => item.id === selectedHistory.id) + 1;

        return (
            <PinDetails
                pinHistory={selectedHistory}
                historyCount={histories.length}
                historyVersion={historyVersion}
            />
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
        if (prevProps.latestHistoryId && latestHistoryId) {
            selectPinHistory(latestHistoryId);
        }
    };
}

const mapStateToProps = ({ pinsReducer, pinHistoriesReducer }, { match }) => {
    const pin = pinsReducer.pins[match.params.id] || {};
    const { historyIds = [], latestHistoryId } = pin;
    const { selectedHistoryId, histories } = pinHistoriesReducer;
    return {
        latestHistoryId,
        selectedHistory: histories[selectedHistoryId] || {},
        histories: historyIds
            .map(id => histories[id])
            .filter(h => h)
            .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
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
