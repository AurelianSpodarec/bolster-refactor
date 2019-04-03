import React, { Component } from 'react';
import { connect } from 'react-redux';

import DrawingMapFiltersAdvanced from '../presentational/DrawingMapFiltersAdvanced';
import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';
import DrawingInspectionLogContainer from './DrawingInspectionLogContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

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
        const { serviceTypeOptions, serviceTypeSelected, mapZoom } = this.state;
        const { error, pins } = this.props;

        return (
            <BlockContainer error={error}>
                <DrawingMapFiltersAdvanced
                    serviceTypeOptions={serviceTypeOptions}
                    serviceTypeSelected={serviceTypeSelected}
                    pins={pins}
                />
                <DrawingInspectionLogContainer />
                <DrawingMapViewSimple
                    position={position}
                    zoom={mapZoom}
                    pins={pins}
                    handleClick={this.handleClick}
                />
            </BlockContainer>
        );
    }

    handleClick = e => {
        const { lat, lng } = e.latlng;
        console.log(lat, lng);
    };
}

const mapStateToProps = ({ companyAdmin: { pinsReducer } }) => ({
    pins: Object.values(pinsReducer.pins),
    isFetching: pinsReducer.isFetching,
    error: pinsReducer.error
});

export default connect(mapStateToProps)(DrawingMapGeneralContainer);
