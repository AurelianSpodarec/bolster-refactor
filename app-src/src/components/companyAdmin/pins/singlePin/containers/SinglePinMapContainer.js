import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editPinLocation from 'actions/companyAdmin/pins/async/editPinLocation';

import SinglePinMap from '../presentational/SinglePinMap';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class SinglePinMapContainer extends Component {
    state = {
        zoom: 18,
        pinLat: 51.505,
        pinLng: -0.09
    };

    render() {
        const { pin, error, isFetching } = this.props;
        const position = [this.state.pinLat, this.state.pinLng];

        return (
            <BlockContainer
                isEmpty={!pin.id}
                isFetching={isFetching}
                error={error}
            >
                <SinglePinMap
                    zoom={this.state.zoom}
                    position={position}
                    pin={pin}
                    error={error}
                    isFetching={isFetching}
                    handleClick={this.handleClick}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { pin } = this.props;
        if (pin.id) this._setMapCentre(pin.latitude, pin.longitude);
    };

    componentDidUpdate = prevProps => {
        const { pin } = this.props;
        if (!prevProps.pin.id && pin.id) {
            this._setMapCentre(pin.latitude, pin.longitude);
        }
    };

    handleClick = ({ latlng: { lat, lng } }) => {
        const { dispatch, pin } = this.props;
        dispatch(editPinLocation(pin.id, lat, lng));
    };

    _setMapCentre = (lat, lng) => {
        this.setState({
            ...this.state,
            mapCentre: [lat, lng]
        });
    };
}

export default withRouter(
    connect(({ companyAdmin: { pinsReducer } }, { match }) => ({
        pin: pinsReducer.pins[match.params.id] || {},
        error: pinsReducer.error,
        isFetching: pinsReducer.isFetching
    }))(SinglePinMapContainer)
);
