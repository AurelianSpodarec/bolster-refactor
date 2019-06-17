import React, { Component } from 'react';
import { connect } from 'react-redux';

import MapPinSelector from '../presentational/MapPinSelector';

class MapPinSelectorContainer extends Component {
    render() {
        const { pins } = this.props;
        return <MapPinSelector pins={pins} />;
    }
}

const mapStateToProps = (state, { client }) => ({
    pins:
        state[client ? 'client' : 'companyAdmin'].reportsReducer.customFilters
            .pins
});

export default connect(mapStateToProps)(MapPinSelectorContainer);
