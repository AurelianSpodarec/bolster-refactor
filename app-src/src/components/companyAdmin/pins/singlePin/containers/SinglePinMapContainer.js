import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editPinLocation from 'actions/companyAdmin/pins/async/editPinLocation';

import SinglePinMap from '../presentational/SinglePinMap';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class SinglePinMapContainer extends Component {
    render() {
        const { pin, user, error, isFetching } = this.props;

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
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { pin } = this.props;
        if (pin.id) this._setMapCentre(pin.location.latY, pin.location.lngX);
    };

    componentDidUpdate = prevProps => {
        const { pin } = this.props;
        if (!prevProps.pin.id && pin.id) {
            this._setMapCentre(pin.location.latY, pin.location.lngX);
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

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { pins, error, isFetching },
            companyUsersReducer: { users }
        }
    },
    { match: { params } }
) => {
    const pin = pins[params.id] || {};

    return {
        pin,
        user: users[pin.latestCreatedByCompanyUserID] || {},
        error,
        isFetching
    };
};

export default withRouter(connect(mapStateToProps)(SinglePinMapContainer));
