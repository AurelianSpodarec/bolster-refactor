import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editPinLocation from 'actions/pins/async/editPinLocation';

import SinglePinMap from '../presentational/SinglePinMap';

class SinglePinMapContainer extends Component {
    state = {
        zoom: 18,
        mapCentre: [53.48057611856212, -2.2364002698505447]
    };

    render() {
        const { pin, error, isFetching } = this.props;
        return (
            <SinglePinMap
                {...this.state}
                pin={pin}
                error={error}
                isFetching={isFetching}
                handleClick={this.handleClick}
            />
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
    connect(({ pinsReducer }, { match }) => ({
        pin: pinsReducer.pins[match.params.id] || {},
        error: pinsReducer.error,
        isFetching: pinsReducer.isFetching
    }))(SinglePinMapContainer)
);
