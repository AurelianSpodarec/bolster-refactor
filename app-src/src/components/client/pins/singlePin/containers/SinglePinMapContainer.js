import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import SinglePinMap from '../presentational/SinglePinMap';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import fetchClientSingleDrawing from 'actions/client/drawings/async/clientFetchSingleDrawing';
import { getSelectedCompanyForClient } from 'helpers/generic';

class SinglePinMapContainer extends Component {
    render() {
        const {
            pin,
            user,
            error,
            isFetching,
            drawing,
            selectedHistory,
            histories
        } = this.props;

        const historyVersion =
            [...histories]
                .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
                .findIndex(item => item.id === selectedHistory.id) + 1;
        return (
            <BlockContainer
                isEmpty={!pin.id || !drawing.id}
                isFetching={isFetching}
                error={error}
            >
                <SinglePinMap
                    zoom={3}
                    pin={pin}
                    user={user}
                    drawing={drawing}
                    pinHistory={selectedHistory}
                    historyVersion={historyVersion}
                    historyCount={histories.length}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { pin, fetchDrawing } = this.props;
        if (!prevProps.pin.id && pin.id) {
            const selectedCompanyID = getSelectedCompanyForClient();

            const lat = pin.location.latY;
            const lng = pin.location.lngX;

            this._setMapCentre(lat, lng);

            fetchDrawing(selectedCompanyID, pin.drawingID);
        }
    };

    // _updateCoordinates = (lat, lng) => {
    //     const { pin } = this.props;
    // };

    _setMapCentre = (lat, lng) => {
        this.setState({
            ...this.state,
            mapCentre: [lat, lng]
        });
    };
}

const mapStateToProps = (
    {
        client: {
            pinsReducer: { pins, error, isFetching },
            pinHistoriesReducer: { histories },
            drawingOperativesReducer: { users },
            drawingsReducer: { drawings }
        },
        shared: {
            selectedHistoryReducer: { selectedHistoryId }
        }
    },
    { match: { params } }
) => {
    const pin = pins[params.id] || {};

    return {
        pin,
        user: users[pin.latestCreatedByCompanyUserID] || {},
        histories: Object.values(histories),
        selectedHistory: histories[selectedHistoryId] || {},
        error,
        isFetching,
        drawing: drawings[pin.drawingID] || {}
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDrawing: (companyID, drawingID) => {
        dispatch(fetchClientSingleDrawing(companyID, drawingID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SinglePinMapContainer)
);
