import React, { Component } from 'react';

import DrawingMapFiltersGeneralContainer from './DrawingMapFiltersGeneralContainer';
import DrawingMapViewAdvancedContainer from './DrawingMapViewAdvancedContainer';

class DrawingMapAdvancedContainer extends Component {
    render() {
        return (
            <div className="size-lg-12">
                <DrawingMapFiltersGeneralContainer />
                <DrawingMapViewAdvancedContainer />
            </div>
        );
    }
}

export default DrawingMapAdvancedContainer;
