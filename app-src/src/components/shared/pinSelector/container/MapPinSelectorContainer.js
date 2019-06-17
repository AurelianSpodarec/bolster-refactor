import React, { Component } from 'react';
import { connect } from 'react-redux';

import MapPinSelector from '../presentational/MapPinSelector';
import { isObjEmpty } from 'helpers/generic';

class MapPinSelectorContainer extends Component {
    render() {
        const { pins, rectangles, excludedPinIDs } = this.props;
        const filteredPins = !isObjEmpty(rectangles)
            ? pins.filter(({ id }) => !excludedPinIDs.includes(id))
            : [];
        return <MapPinSelector pins={filteredPins} />;
    }
}

const mapStateToProps = (state, { client }) => {
    const reducer = state[client ? 'client' : 'companyAdmin'];
    const { reportsReducer } = reducer;
    return {
        pins: reportsReducer.customFilters.pins,
        rectangles: reportsReducer.rectangles,
        excludedPinIDs: Object.values(reportsReducer.excludedPinIDs)
    };
};

export default connect(mapStateToProps)(MapPinSelectorContainer);

// finding logged in company id for fetch pins !!!
