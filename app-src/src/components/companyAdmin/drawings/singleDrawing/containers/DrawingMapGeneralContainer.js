import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import updatePinCoordinates from 'actions/companyAdmin/drawings/sync/updatePinCoordinates';
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
        mapZoom: 3,
        addMode: false,
        addPinLat: 51.505,
        addPinLng: -0.09
    };

    render() {
        const position = [this.state.addPinLat, this.state.addPinLng];
        const addPinPosition = [this.state.addPinLat, this.state.addPinLng];

        const {
            serviceSelectedID,
            statusSelectedID,
            operativeSelectedID,
            startDateSelected,
            endDateSelected,
            mapZoom,
            addMode
        } = this.state;
        const { error, pins, drawing } = this.props;

        const serviceOptions = this._getServicesOptions();
        const statusOptions = convertEnumToDropdownOptions(PIN_STATUS_TYPES);
        const operativeOptions = this._getOperativeOptions();

        return (
            <>
                <div className="flex-container size-lg-12">
                    <div className="flex-item size-lg-8">
                        <BlockContainer error={error}>
                            <DrawingMapFiltersAdvanced
                                serviceOptions={Object.values(serviceOptions)}
                                selectedService={
                                    serviceOptions[serviceSelectedID]
                                }
                                statusOptions={Object.values(statusOptions)}
                                selectedStatus={statusOptions[statusSelectedID]}
                                operativeOptions={Object.values(
                                    operativeOptions
                                )}
                                selectedOperative={
                                    operativeOptions[operativeSelectedID]
                                }
                                startDateSelected={startDateSelected}
                                endDateSelected={endDateSelected}
                                pins={pins}
                                handleChange={this.handleChange}
                                handleDateChange={this.handleDateChange}
                            />
                        </BlockContainer>
                    </div>

                    <DrawingInspectionLogContainer />
                </div>
                <BlockContainer error={error} isEmpty={!drawing}>
                    <DrawingMapViewSimple
                        position={position}
                        addPinPosition={addPinPosition}
                        zoom={mapZoom}
                        pins={this._getFilteredPins()}
                        handleClick={this.handleClick}
                        drawing={drawing}
                        addMode={addMode}
                        toggleAddMode={this.toggleAddMode}
                        history={this.props.history}
                    />
                </BlockContainer>
            </>
        );
    }

    componentDidMount = () => {
        const { fetchCompanyUsers } = this.props;

        fetchCompanyUsers();
        this._resetCoordinates();
    };

    handleClick = e => {
        const { lat, lng } = e.latlng;

        if (this.state.addMode) {
            this._updateCoordinates(lat, lng);
        }
    };

    handleChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handleDateChange = (date, name) => {
        this.setState({
            [name]: date
        });
    };

    toggleAddMode = () => {
        this.setState({
            addMode: !this.state.addMode
        });

        this._resetCoordinates();
    };

    _resetCoordinates = () => {
        const { updatePinCoordinates } = this.props;

        updatePinCoordinates('lat', 0);
        updatePinCoordinates('lng', 0);

        this.setState({
            addPinLat: 51.505,
            addPinLng: -0.09
        });
    };

    _updateCoordinates = (lat, lng) => {
        const { updatePinCoordinates } = this.props;

        updatePinCoordinates('lat', lat);
        updatePinCoordinates('lng', lng);

        this.setState({
            addPinLat: lat,
            addPinLng: lng
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
            .filter(user => user.type >= USER_ROLE.OPERATIVE)
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

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { pins, isFetching, error },
            servicesReducer: { services },
            companyUsersReducer: { users },
            drawingsReducer: { drawings },
            addPinCoordinatesReducer: { coordinates }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id],
    coordinates: coordinates,
    pins: Object.values(pins),
    users: Object.values(users),
    services: Object.values(services),
    isFetching: isFetching,
    error: error
});

const mapDispatchToProps = dispatch => ({
    fetchCompanyUsers: () => {
        dispatch(fetchCompanyUsers());
    },
    updatePinCoordinates: (name, value) => {
        dispatch(updatePinCoordinates(name, value));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DrawingMapGeneralContainer)
);
