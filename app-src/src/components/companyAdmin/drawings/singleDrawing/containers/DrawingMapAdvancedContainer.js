import React, { Component } from 'react';
import { connect } from 'react-redux';

import DrawingMapFiltersSimple from '../presentational/DrawingMapFiltersSimple';
import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';

class DrawingMapAdvancedContainer extends Component {
    state = {
        pinLat: 51.505,
        pinLng: -0.09,
        mapZoom: 13
    };

    render() {
        const position = [this.state.pinLat, this.state.pinLng];
        const { pins } = this.props;
        return (
            <div className="size-lg-12">
                <DrawingMapFiltersSimple />
                <DrawingMapViewSimple
                    position={position}
                    zoom={this.state.mapZoom}
                    pins={pins}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ companyAdmin: { pinsReducer } }) => ({
    pins: Object.values(pinsReducer.pins),
    isFetching: pinsReducer.isFetching,
    error: pinsReducer.error
});

export default connect(mapStateToProps)(DrawingMapAdvancedContainer);
