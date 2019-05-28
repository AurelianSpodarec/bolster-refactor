import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
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
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import updateFloorPlanConfirmed from 'actions/companyAdmin/drawings/sync/updateFloorPlanConfirmed';

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
        const {
            serviceSelectedID,
            statusSelectedID,
            operativeSelectedID,
            startDateSelected,
            endDateSelected,
            mapZoom,
            addMode,
            addPinLat,
            addPinLng
        } = this.state;
        const position = [addPinLat, addPinLng];
        const addPinPosition = [addPinLat, addPinLng];

        const { error, pins, drawing = {}, updatingFloorPlan } = this.props;
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
                        showModal={this.props.showModal}
                        position={position}
                        addPinPosition={addPinPosition}
                        zoom={mapZoom}
                        pins={this._getFilteredPins()}
                        handleClick={this.handleClick}
                        drawing={drawing}
                        addMode={addMode}
                        handleClearPinCache={this.handleClearPinCache}
                        toggleAddMode={this.toggleAddMode}
                        history={this.props.history}
                        updating={updatingFloorPlan}
                    />
                </BlockContainer>
            </>
        );
    }

    componentDidMount = () => {
        this.props.fetchCompanyUsers();
        this._resetCoordinates();
    };

    componentDidUpdate = ({ drawing: prevDrawing = {}, ...prevProps }) => {
        const {
            updatingFloorPlan,
            drawing = {},
            fetchSingleDrawing,
            updateFloorPlanConfirmed
        } = this.props;
        if (updatingFloorPlan && !prevProps.updatingFloorPlan) {
            // drawing successfully updated
            this._floorplanInterval = setInterval(() => {
                fetchSingleDrawing(drawing.id);
            }, 5000);
        }
        if (drawing.tilesetS3Key !== prevDrawing.tilesetS3Key) {
            clearInterval(this._floorplanInterval);
            updateFloorPlanConfirmed();
        }
    };

    componentWillUnmount = () => {
        clearInterval(this._floorplanInterval);
    };

    handleClick = e => {
        const { lat, lng } = e.latlng;

        if (this.state.addMode) this._updateCoordinates(lat, lng);
    };

    handleClearPinCache = () => {
        const {
            drawing: { id }
        } = this.props;
        localStorage.removeItem(`pinCache/${id}`);
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleDateChange = (date, name) => this.setState({ [name]: date });

    toggleAddMode = () => {
        this.setState({ addMode: !this.state.addMode });

        this._resetCoordinates();
    };

    _resetCoordinates = () => {
        const { updatePinCoordinates } = this.props;

        updatePinCoordinates('lat', 51.505);
        updatePinCoordinates('lng', -0.09);

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
        const { services, pins } = this.props;

        const servicesOnDrawing = pins.reduce((acc, { latestServiceID }) => {
            if (!acc.includes(latestServiceID)) acc.push(latestServiceID);
            return acc;
        }, []);

        const options = services.reduce((acc, { id, name }) => {
            if (servicesOnDrawing.includes(id)) {
                acc.push({ value: id, text: name });
            }
            return acc;
        }, []);

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

        const filterPins = pins.filter(pin => {
            if (
                serviceSelectedID &&
                +pin.latestServiceID !== +serviceSelectedID
            ) {
                return false;
            }
            if (statusSelectedID && +pin.latestStatus !== +statusSelectedID) {
                return false;
            }
            if (
                operativeSelectedID &&
                +pin.latestCreatedByCompanyUserID !== +operativeSelectedID
            ) {
                return false;
            }
            if (
                startDateSelected &&
                moment(pin.latestCreatedOn) < moment(startDateSelected)
            ) {
                return false;
            }
            if (
                endDateSelected &&
                moment(pin.latestCreatedOn) > moment(endDateSelected)
            ) {
                return false;
            }
            return true;
        });

        return filterPins;
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { pins, isFetching, error },
            servicesReducer: { services },
            companyUsersReducer: { users },
            drawingsReducer: { drawings, updatingFloorPlan },
            addPinCoordinatesReducer: { coordinates }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id],
    coordinates,
    pins: Object.values(pins),
    users: Object.values(users),
    services: Object.values(services),
    isFetching,
    error,
    updatingFloorPlan
});

const mapDispatchToProps = {
    fetchCompanyUsers,
    fetchSingleDrawing,
    updatePinCoordinates,
    showModal,
    updateFloorPlanConfirmed
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DrawingMapGeneralContainer)
);
