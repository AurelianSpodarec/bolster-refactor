import React, { Component } from 'react';

import DrawingMapFiltersAdvanced from '../presentational/DrawingMapFiltersAdvanced';

class DrawingMapFiltersAdvancedContainer extends Component {
    state = {
        serviceTypeOptions: ['All services', 'Service 1'],
        serviceTypeSelected: 'All services'
    };

    render() {
        return (
            <DrawingMapFiltersAdvanced
                serviceTypeOptions={this.state.serviceTypeOptions}
                serviceTypeSelected={this.state.serviceTypeSelected}
            />
        );
    }
}

export default DrawingMapFiltersAdvancedContainer;
