import React, { Component } from 'react';
import { connect } from 'react-redux';

import DrawingMapFiltersAdvanced from '../presentational/DrawingMapFiltersAdvanced';
import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';
import DrawingInspectionLogContainer from './DrawingInspectionLogContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { convertArrToObj } from 'helpers/generic';

class DrawingMapGeneralContainer extends Component {
    state = {
        serviceSelectedID: '',
        pinLat: 51.505,
        pinLng: -0.09,
        mapZoom: 3
    };

    render() {
        const position = [this.state.pinLat, this.state.pinLng];
        const { serviceSelectedID, mapZoom } = this.state;
        const { error, pins } = this.props;

        const serviceOptions = this._getServicesOptions();

        return (
            <BlockContainer error={error}>
                <DrawingMapFiltersAdvanced
                    serviceOptions={Object.values(serviceOptions)}
                    serviceSelectedID={serviceSelectedID}
                    selectedService={serviceOptions[serviceSelectedID]}
                    pins={pins}
                    handleChange={this.handleChange}
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

    handleChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    _getServicesOptions = () => {
        const { services } = this.props;

        const options = services.map(({ id, name }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };
}

const mapStateToProps = ({
    companyAdmin: { pinsReducer, servicesReducer }
}) => ({
    pins: Object.values(pinsReducer.pins),
    services: Object.values(servicesReducer.services),
    isFetching: pinsReducer.isFetching,
    error: pinsReducer.error
});

export default connect(mapStateToProps)(DrawingMapGeneralContainer);
