import React, { Component } from 'react';

import DrawingMapFiltersAdvancedContainer from './DrawingMapFiltersAdvancedContainer';
import DrawingMapViewGeneralContainer from './DrawingMapViewGeneralContainer';

class DrawingMapGeneralContainer extends Component {
    render() {
        return (
            <div className="size-lg-12">
                <DrawingMapFiltersAdvancedContainer />
                <DrawingMapViewGeneralContainer />
            </div>
        );
    }
}

export default DrawingMapGeneralContainer;
