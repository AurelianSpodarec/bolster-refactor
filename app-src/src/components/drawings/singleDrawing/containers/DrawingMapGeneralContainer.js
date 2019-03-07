import React, { Component } from 'react';

import DrawingMapFiltersAdvanced from '../presentational/DrawingMapFiltersAdvanced';
import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';

class DrawingMapGeneralContainer extends Component {
    state = {
        serviceTypeOptions: [
            {
                value: 0,
                text: 'All services'
            },
            {
                value: 1,
                text: 'Service 1'
            }
        ],
        serviceTypeSelected: 'All services'
    };

    render() {
        return (
            <div className="size-lg-12">
                <DrawingMapFiltersAdvanced
                    serviceTypeOptions={this.state.serviceTypeOptions}
                    serviceTypeSelected={this.state.serviceTypeSelected}
                />
                <DrawingMapViewSimple />
            </div>
        );
    }
}

export default DrawingMapGeneralContainer;
