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
        mapZoom: 3
    };

    render() {
        const position = [this.state.pinLat, this.state.pinLng];

        // let pins = [];

        // for (let i = 0; i < 5000; i++) {
        //     const newPin = {
        //         id: i,
        //         latitude: 56.78696472965114,
        //         longitude: -83.74763705103969,
        //         title: `Marker ${i}`,
        //         description: `Description ${i}`,
        //         status: 'Action Required'
        //     };

        //     pins.push(newPin);
        // }

        return (
            <div className="size-lg-12">
                <DrawingMapFiltersAdvanced
                    serviceTypeOptions={this.state.serviceTypeOptions}
                    serviceTypeSelected={this.state.serviceTypeSelected}
                    pins={this.props.pins}
                />
                <DrawingMapViewSimple
                    position={position}
                    zoom={this.state.mapZoom}
                    pins={this.props.pins}
                    handleClick={this.handleClick}
                />
            </div>
        );
    }

    handleClick = e => {
        const { lat, lng } = e.latlng;
        console.log(lat, lng);
    };
}

const mapStateToProps = ({ pinsReducer }) => ({
    pins: Object.values(pinsReducer.pins),
    isFetching: pinsReducer.isFetching,
    error: pinsReducer.error
});

export default connect(mapStateToProps)(DrawingMapGeneralContainer);
