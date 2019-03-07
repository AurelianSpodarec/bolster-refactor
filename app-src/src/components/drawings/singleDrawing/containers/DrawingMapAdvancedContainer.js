import React, { Component } from 'react';

import DrawingMapFiltersSimple from '../presentational/DrawingMapFiltersSimple';
import DrawingMapViewAdvanced from '../presentational/DrawingMapViewAdvanced';

class DrawingMapAdvancedContainer extends Component {
    render() {
        return (
            <div className="size-lg-12">
                <DrawingMapFiltersSimple />
                <DrawingMapViewAdvanced />
            </div>
        );
    }
}

export default DrawingMapAdvancedContainer;
