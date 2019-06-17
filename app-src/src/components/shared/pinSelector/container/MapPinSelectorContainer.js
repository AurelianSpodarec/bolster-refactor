import React, { Component } from 'react';
import { connect } from 'react-redux';

import MapPinSelector from '../presentational/MapPinSelector';
import { isObjEmpty } from 'helpers/generic';

class MapPinSelectorContainer extends Component {
    render() {
        const { pins, rectangles } = this.props;

        return <MapPinSelector pins={!isObjEmpty(rectangles) ? pins : []} />;
    }
}

const mapStateToProps = (state, { client }) => {
    const reducer = state[client ? 'client' : 'companyAdmin'];
    const { reportsReducer } = reducer;
    return {
        pins: reportsReducer.customFilters.pins,
        rectangles: reportsReducer.rectangles
    };
};

export default connect(mapStateToProps)(MapPinSelectorContainer);
