import React, { Component } from 'react';
import { connect } from 'react-redux';

import MapPinSelector from '../presentational/MapPinSelector';

class MapPinSelectorContainer extends Component {
    render() {
        const { pins } = this.props;
        return <MapPinSelector pins={pins} />;
    }
}

const mapStateToProps = (state, { client }) => {
    const reducer = state[client ? 'client' : 'companyAdmin'];
    const { reportsReducer } = reducer;
    return {
        pins: reportsReducer.customFilters.pins,
        rectangles: reportsReducer.recangles
    };
};

export default connect(mapStateToProps)(MapPinSelectorContainer);
