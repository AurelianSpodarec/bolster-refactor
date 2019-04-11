import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import DrawingMapFiltersAdvanced from '../presentational/DrawingMapFiltersAdvanced';
import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';
import DrawingInspectionLogContainer from './DrawingInspectionLogContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { convertArrToObj, convertEnumToDropdownOptions } from 'helpers/generic';
import {
    PIN_STATUS_TYPES,
    COMPANY_USER_ROLE_TYPES as USER_ROLE
} from 'constants/companyAdmin/enums';

class DrawingMapGeneralContainer extends Component {
    state = {
        serviceSelectedID: '',
        statusSelectedID: '',
        operativeSelectedID: '',
        startDateSelected: undefined,
        endDateSelected: undefined,
        pinLat: 51.505,
        pinLng: -0.09,
        mapZoom: 3
    };

    render() {
        const position = [this.state.pinLat, this.state.pinLng];
        const {
            serviceSelectedID,
            statusSelectedID,
            operativeSelectedID,
            startDateSelected,
            endDateSelected,
            mapZoom
        } = this.state;
        const { error, pins } = this.props;

        const serviceOptions = this._getServicesOptions();
        const statusOptions = convertEnumToDropdownOptions(PIN_STATUS_TYPES);
        const operativeOptions = this._getOperativeOptions();

        return (
            <BlockContainer error={error}>
                <DrawingMapFiltersAdvanced
                    serviceOptions={Object.values(serviceOptions)}
                    selectedService={serviceOptions[serviceSelectedID]}
                    statusOptions={Object.values(statusOptions)}
                    selectedStatus={statusOptions[statusSelectedID]}
                    operativeOptions={Object.values(operativeOptions)}
                    selectedOperative={operativeOptions[operativeSelectedID]}
                    startDateSelected={startDateSelected}
                    endDateSelected={endDateSelected}
                    pins={pins}
                    handleChange={this.handleChange}
                    handleDateChange={this.handleDateChange}
                />
                <DrawingInspectionLogContainer />
                <DrawingMapViewSimple
                    position={position}
                    zoom={mapZoom}
                    pins={this._getFilteredPins()}
                    handleClick={this.handleClick}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        this.props.fetchCompanyUsers();
    };

    handleClick = e => {
        const { lat, lng } = e.latlng;
        // console.log(lat, lng);
    };

    handleChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handleDateChange = (date, name) => {
        this.setState({
            [name]: date
        });
    };

    _getServicesOptions = () => {
        const { services } = this.props;

        const options = services.map(({ id, name }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };

    _getOperativeOptions = () => {
        const { users } = this.props;

        const options = users
            .filter(user => user.type === USER_ROLE.OPERATIVE)
            .map(({ id, userFirstName, userLastName, userEmail }) => ({
                value: id,
                text: `${userFirstName} ${userLastName} <${userEmail}>`
            }));

        return convertArrToObj(options, 'value');
    };

    _getFilteredPins = () => {
        const { pins } = this.props;
        const {
            serviceSelectedID,
            statusSelectedID,
            operativeSelectedID,
            startDateSelected,
            endDateSelected
        } = this.state;

        let filteredPins = pins;

        if (serviceSelectedID) {
            filteredPins = filteredPins.filter(
                pin => pin.latestServiceID === parseInt(serviceSelectedID)
            );
        }

        if (statusSelectedID) {
            filteredPins = filteredPins.filter(
                pin => pin.latestStatus === parseInt(statusSelectedID)
            );
        }

        if (operativeSelectedID) {
            filteredPins = filteredPins.filter(
                pin =>
                    pin.latestCreatedByCompanyUserID ===
                    parseInt(operativeSelectedID)
            );
        }

        if (startDateSelected && endDateSelected) {
            filteredPins = filteredPins.filter(
                pin =>
                    new Date(pin.latestCreatedOn).getTime() >=
                        startDateSelected.getTime() &&
                    new Date(pin.latestCreatedOn).getTime() <=
                        endDateSelected.getTime()
            );
        }

        return filteredPins;
    };
}

const mapStateToProps = ({
    companyAdmin: { pinsReducer, servicesReducer, companyUsersReducer }
}) => ({
    pins: Object.values(pinsReducer.pins),
    users: Object.values(companyUsersReducer.users),
    services: Object.values(servicesReducer.services),
    isFetching: pinsReducer.isFetching,
    error: pinsReducer.error
});

const mapDispatchToProps = dispatch => ({
    fetchCompanyUsers: () => {
        dispatch(fetchCompanyUsers());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawingMapGeneralContainer);
