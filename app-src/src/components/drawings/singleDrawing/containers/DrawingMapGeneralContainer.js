import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        serviceTypeSelected: 'All services',
        pinLat: 51.505,
        pinLng: -0.09,
        mapZoom: 13
    };

    render() {
        const position = [this.state.pinLat, this.state.pinLng];

        return (
            <div className="size-lg-12">
                <DrawingMapFiltersAdvanced
                    serviceTypeOptions={this.state.serviceTypeOptions}
                    serviceTypeSelected={this.state.serviceTypeSelected}
                />
                <DrawingMapViewSimple
                    position={position}
                    zoom={this.state.mapZoom}
                    pins={this.props.pins}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ pinsReducer }) => ({
    pins: Object.values(pinsReducer.pins),
    isFetching: pinsReducer.isFetching,
    error: pinsReducer.error
});

export default connect(mapStateToProps)(DrawingMapGeneralContainer);
