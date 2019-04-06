import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import selectPinHistory from 'actions/companyAdmin/pins/sync/selectPinHistory';

import PinDetails from '../presentational/PinDetails';

class PinDetailsContainer extends Component {
    render() {
        const { selectedHistory, histories, error, isFetching } = this.props;

        const historyVersion =
            [...histories]
                .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
                .findIndex(item => item.id === selectedHistory.id) + 1;

        console.log('*************');
        console.log('*************');
        console.log(this.props.pin);
        console.log('*************');
        console.log('*************');

        return (
            <PinDetails
                error={error}
                isFetching={isFetching}
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
        if (!prevProps.latestHistoryId && latestHistoryId) {
            selectPinHistory(latestHistoryId);
        }
    };
}

const mapStateToProps = (
    { companyAdmin: { pinsReducer, pinHistoriesReducer } },
    { match }
) => {
    const pin = pinsReducer.pins[match.params.id] || {};
    const { selectedHistoryId, histories } = pinHistoriesReducer;

    return {
        isFetching: pinsReducer.isFetching || pinHistoriesReducer.isFetching,
        error: pinHistoriesReducer.error,
        latestHistoryId: pin.latestHistoryId,
        selectedHistory: histories[selectedHistoryId] || {},
        histories: Object.values(histories),
        pin: pin
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
