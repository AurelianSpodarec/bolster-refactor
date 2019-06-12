import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import SinglePinMap from '../presentational/SinglePinMap';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import editPinLocation from 'actions/companyAdmin/pins/async/editPinLocation';
import updatePinCoordinates from 'actions/companyAdmin/drawings/sync/updatePinCoordinates';
import { CONFIRM_EDIT_PIN } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class SinglePinMapContainer extends Component {
    state = {
        moveMode: false,
        editPinLocationLat: 0,
        editPinLocationLng: 0
    };

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

        const editPinLocationPosition = [
            this.state.editPinLocationLat,
            this.state.editPinLocationLng
        ];

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
                    editPinLocationPosition={editPinLocationPosition}
                    pin={pin}
                    handleClick={this.handleMapClick}
                    user={user}
                    drawing={drawing}
                    toggleMoveMode={this.toggleMoveMode}
                    moveMode={this.state.moveMode}
                    handleEditPinLocation={this.handleEditPinLocation}
                    pinHistory={selectedHistory}
                    historyVersion={historyVersion}
                    historyCount={histories.length}
                    handleEditHistoryModal={this.handleEditHistoryModal}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { pin, fetchDrawing, updatePinCoordinates } = this.props;
        if (!prevProps.pin.id && pin.id) {
            const lat = pin.location.latY;
            const lng = pin.location.lngX;

            this._setMapCentre(lat, lng);

            updatePinCoordinates('lat', lat);
            updatePinCoordinates('lng', lng);

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

    handleEditHistoryModal = () => {
        const { showModal, selectedHistory } = this.props;
        const editURL = `/company/pins/${selectedHistory.pinID}/edit-history/${
            selectedHistory.id
        }`;
        showModal(CONFIRM_EDIT_PIN, { editURL });
    };

    handleMapClick = ({ latlng: { lat, lng } }) => {
        if (this.state.moveMode) {
            this.setState({
                editPinLocationLat: lat,
                editPinLocationLng: lng
            });
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

    handleEditPinLocation = () => {
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
            pinHistoriesReducer: { histories },
            companyUsersReducer: { users },
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
        postSuccess,
        drawing: drawings[pin.drawingID] || {}
    };
};

const mapDispatchToProps = dispatch => ({
    editPinLocation: (id, lat, lng) =>
        dispatch(editPinLocation(id, { location: { lngX: lng, latY: lat } })),
    updatePinCoordinates: (name, value) => {
        dispatch(updatePinCoordinates(name, value));
    },
    fetchDrawing: drawingID => dispatch(fetchSingleDrawing(drawingID)),
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SinglePinMapContainer)
);
