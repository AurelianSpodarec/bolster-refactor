import React, { Component } from 'react';

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

        return (
            <div className="size-lg-12">
                <DrawingMapFiltersSimple />
                <DrawingMapViewSimple
                    position={position}
                    zoom={this.state.mapZoom}
                />
            </div>
        );
    }
}

export default DrawingMapAdvancedContainer;
