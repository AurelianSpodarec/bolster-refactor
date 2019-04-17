import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SinglePinMap from '../presentational/SinglePinMap';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import editPinLocation from 'actions/companyAdmin/pins/async/editPinLocation';

class SinglePinMapContainer extends Component {
    state = {
        moveMode: false,
        editPinLocationLat: 0,
        editPinLocationLng: 0
    };

    render() {
        const { pin, user, error, isFetching, drawing } = this.props;

        const editPinLocationPosition = [
            this.state.editPinLocationLat,
            this.state.editPinLocationLng
        ];

        return (
            <BlockContainer
                isEmpty={!pin.id || !drawing.id}
                isFetching={isFetching}
                error={error}
            >
                <SinglePinMap
                    zoom={3}
                    editPinLocationPosition={editPinLocationPosition}
                    pin={pin}
                    handleClick={this.handleMapClick}
                    user={user}
                    drawing={drawing}
                    toggleMoveMode={this.toggleMoveMode}
                    moveMode={this.state.moveMode}
                    handleeditPinLocation={this.handleeditPinLocation}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { pin, fetchDrawing } = this.props;
        if (!prevProps.pin.id && pin.id) {
            this._setMapCentre(pin.location.latY, pin.location.lngX);

            this.setState({
                editPinLocationLat: pin.location.latY,
                editPinLocationLng: pin.location.lngX
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
                editPinLocationLat: lat,
                editPinLocationLng: lng
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

    handleeditPinLocation = () => {
        const { editPinLocationLat, editPinLocationLng } = this.state;
        const {
            editPinLocation,
            pin: { id }
        } = this.props;
        editPinLocation(id, editPinLocationLat, editPinLocationLng);
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
    editPinLocation: (id, lat, lng) =>
        dispatch(editPinLocation(id, { location: { lngX: lng, latY: lat } })),
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
