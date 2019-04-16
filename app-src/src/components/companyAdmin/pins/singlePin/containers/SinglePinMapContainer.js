import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editPinLocation from 'actions/companyAdmin/pins/async/editPinLocation';
import updatePinCoordinates from 'actions/companyAdmin/drawings/sync/updatePinCoordinates';

import SinglePinMap from '../presentational/SinglePinMap';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class SinglePinMapContainer extends Component {
    render() {
        const { pin, user, error, isFetching, drawings } = this.props;

        const curDrawing = drawings.filter(item=>item.id === pin.drawingID)[0];

        return (
            <BlockContainer
                isEmpty={!pin.id}
                isFetching={isFetching}
                error={error}
            >
                <SinglePinMap
                    zoom={3}
                    pin={pin}
                    handleClick={this.handleClick}
                    user={user}
                    drawing={curDrawing}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { pin, updatePinCoordinates } = this.props;
        if (!prevProps.pin.id && pin.id) {
            this._setMapCentre(pin.location.latY, pin.location.lngX);
            const lat = pin.location.latY;
            const lng = pin.location.lngX;

            updatePinCoordinates('lat', lat);
            updatePinCoordinates('lng', lng);
        }
    };

    handleClick = ({ latlng: { lat, lng } }) => {
        const { editPinLocation, pin } = this.props;
        editPinLocation(pin.id, lat, lng);
    };

    _setMapCentre = (lat, lng) => {
        this.setState({
            ...this.state,
            mapCentre: [lat, lng]
        });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { pins, error, isFetching },
            companyUsersReducer: { users },
            drawingsReducer: {drawings}
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
        drawings: Object.values(drawings)
    };
};

const mapDispatchToProps = dispatch => ({
    editPinLocation: (id, lat, lng) => {
        dispatch(editPinLocation(id, lat, lng));
    },
    updatePinCoordinates: (name, value) => {
        dispatch(updatePinCoordinates(name, value));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SinglePinMapContainer)
);
