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
import { isEmpty } from 'helpers/generic';
import PinInspectionLogContainer from './PinInspectionLogContainer';

class SinglePinMapContainer extends Component {
    state = {
        moveMode: false,
        editPinLocationLat: 0,
        editPinLocationLng: 0
    };

    render() {
        const {
            pin,
            error,
            isFetching,
            drawing,
            selectedHistory,
            onMobile,
            histories
        } = this.props;

        const editPinLocationPosition = [
            this.state.editPinLocationLat,
            this.state.editPinLocationLng
        ];

        const latestUserName = [...histories].sort(
            (a, b) => moment(b.createdOn) - moment(a.createdOn).format()
        );

        return (
            <div className="flex-container">
                <BlockContainer
                    containerClass={`${onMobile ? 'size-lg-12' : 'size-lg-8'}`}
                    isEmpty={!pin.id || !drawing.id || isEmpty(histories)}
                    isFetching={isFetching}
                    error={error}
                >
                    <SinglePinMap
                        zoom={3}
                        editPinLocationPosition={editPinLocationPosition}
                        pin={pin}
                        handleClick={this.handleMapClick}
                        user={latestUserName[0]}
                        drawing={drawing}
                        toggleMoveMode={this.toggleMoveMode}
                        moveMode={this.state.moveMode}
                        handleEditPinLocation={this.handleEditPinLocation}
                        pinHistory={selectedHistory}
                        history={this.props.history}
                        handleEditHistoryModal={this.handleEditHistoryModal}
                        onMobile={onMobile}
                    />
                </BlockContainer>

                <PinInspectionLogContainer />
            </div>
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
            drawingsReducer: { drawings }
        },
        shared: {
            selectedHistoryReducer: { selectedHistoryId },
            mobileReducer: { onMobile }
        }
    },
    { match: { params } }
) => {
    const pin = pins[params.id] || {};

    return {
        pin,
        histories: Object.values(histories),
        selectedHistory: histories[selectedHistoryId] || {},
        error,
        isFetching,
        postSuccess,
        drawing: drawings[pin.drawingID] || {},
        onMobile
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
