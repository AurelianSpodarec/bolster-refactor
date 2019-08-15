import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SinglePinMap from '../presentational/SinglePinMap';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import fetchClientSingleDrawing from 'actions/client/drawings/async/clientFetchSingleDrawing';
import { getSelectedCompanyForClient } from 'helpers/generic';
class SinglePinMapContainer extends Component {
    render() {
        const { pin, user, error, isFetching, drawing, selectedHistory, histories } = this.props;

        return (
            <BlockContainer isEmpty={!pin.id || !drawing.id} isFetching={isFetching} error={error}>
                <SinglePinMap
                    zoom={3}
                    pin={pin}
                    user={user}
                    drawing={drawing}
                    pinHistory={selectedHistory}
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
            pinsReducer: { singlePin, error: pinsError, isFetching: fetchingPins },
            pinHistoriesReducer: { histories },
            pinOperativesReducer: { users, isFetching: fetchingOperatives, error: operativesError },
            drawingsReducer: { drawings }
        },
        shared: {
            selectedHistoryReducer: { selectedHistoryId }
        }
    },
    { match: { params } }
) => {
    const pin = singlePin[params.id] || {};

    return {
        pin,
        user: users[pin.latestCreatedByCompanyUserID] || {},
        histories: Object.values(histories),
        selectedHistory: histories[selectedHistoryId] || {},
        error: pinsError || operativesError,
        isFetching: fetchingPins || fetchingOperatives,
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
