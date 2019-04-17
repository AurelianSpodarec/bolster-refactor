import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editPinLocation from 'actions/companyAdmin/pins/async/editPinLocation';

import SinglePinMap from '../presentational/SinglePinMap';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import movePin from 'actions/companyAdmin/pins/async/movePin';

class SinglePinMapContainer extends Component {
    state = {
        moveMode: false,
        movePinLat: 0,
        movePinLng: 0
    };

    render() {
        const { pin, user, error, isFetching, drawing } = this.props;

        const movePinPosition = [this.state.movePinLat, this.state.movePinLng];

        return (
            <BlockContainer
                isEmpty={!pin.id || !drawing.id}
                isFetching={isFetching}
                error={error}
            >
                <SinglePinMap
                    zoom={3}
                    movePinPosition={movePinPosition}
                    pin={pin}
                    handleClick={this.handleMapClick}
                    user={user}
                    drawing={drawing}
                    toggleMoveMode={this.toggleMoveMode}
                    moveMode={this.state.moveMode}
                    handleMovePin={this.handleMovePin}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { pin, fetchDrawing } = this.props;
        if (!prevProps.pin.id && pin.id) {
            this._setMapCentre(pin.location.latY, pin.location.lngX);

            this.setState({
                movePinLat: pin.location.latY,
                movePinLng: pin.location.lngX
            });

            fetchDrawing(pin.drawingID);
        }
    };

    toggleMoveMode = () => {
        this.setState({
            moveMode: !this.state.moveMode
        });
    };

    handleMapClick = ({ latlng: { lat, lng } }) => {
        if (this.state.moveMode) {
            this.setState({
                movePinLat: lat,
                movePinLng: lng
            });
        }
    };

    _updateCoordinates = (lat, lng) => {
        const { pin } = this.props;
    };

    _setMapCentre = (lat, lng) => {
        this.setState({
            ...this.state,
            mapCentre: [lat, lng]
        });
    };

    handleMovePin = () => {
        const { movePinLat, movePinLng } = this.state;
        const {
            movePin,
            pin: { id }
        } = this.props;
        movePin(id, movePinLat, movePinLng);
        this.setState({
            moveMode: false
        });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { pins, error, isFetching, postSuccess },
            companyUsersReducer: { users },
            drawingsReducer: { drawings }
        }
    },
    { match: { params } }
) => {
    const pin = pins[params.id] || {};

    return {
        pin,
        user: users[pin.latestCreatedByCompanyUserID] || {},
        error,
        isFetching,
        postSuccess,
        drawing: drawings[pin.drawingID] || {}
    };
};

const mapDispatchToProps = dispatch => ({
    editPinLocation: (id, lat, lng) => {
        dispatch(editPinLocation(id, lat, lng));
    },
    movePin: (id, lat, lng) =>
        dispatch(movePin(id, { location: { lngX: lng, latY: lat } })),
    fetchDrawing: drawingID => {
        dispatch(fetchSingleDrawing(drawingID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SinglePinMapContainer)
);
