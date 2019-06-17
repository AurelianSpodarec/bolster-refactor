import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import updatePinCoordinates from 'actions/companyAdmin/drawings/sync/updatePinCoordinates';
import DrawingMapFiltersAdvanced from '../presentational/DrawingMapFiltersAdvanced';
import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';
import DrawingInspectionLogContainer from './DrawingInspectionLogContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { convertArrToObj, convertEnumToDropdownOptions } from 'helpers/generic';
import {
    PIN_STATUS_TYPES,
    COMPANY_USER_ROLE_TYPES as USER_ROLE,
    FLOORPLAN_STATE_MESSAGES
} from 'constants/companyAdmin/enums';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import updateFloorPlanConfirmed from 'actions/companyAdmin/drawings/sync/updateFloorPlanConfirmed';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import withUpdateOnChange from 'components/companyAdmin/reports/createReport/components/hocs/withUpdateOnChange';
import DrawingDetailsContainer from './DrawingDetailsContainer';

class DrawingMapGeneralContainer extends Component {
    state = {
        mapZoom: 3,
        addMode: false,
        addPinLat: 51.505,
        addPinLng: -0.09,
        centerLat: 51.505,
        centerLng: -0.09
    };

    render() {
        const {
            mapZoom,
            addMode,
            addPinLat,
            addPinLng,
            centerLat,
            centerLng
        } = this.state;
        const {
            filters: {
                serviceID,
                status,
                fromDateInclusive,
                toDateInclusive,
                companyUserIDs
            },
            customFilters: { operatives },
            error,
            pins,
            drawing,
            fieldErrors
        } = this.props;
        const position = [centerLat, centerLng];
        const addPinPosition = [addPinLat, addPinLng];

        const serviceOptions = this._getServicesOptions();
        const statusOptions = convertEnumToDropdownOptions(PIN_STATUS_TYPES);

        const updateMessage =
            FLOORPLAN_STATE_MESSAGES[drawing.latestFloorplanState];

        const dateError = fieldErrors['fromDateInclusive']
            ? 'Start date must not be after end date.'
            : null;
        return (
            <>
                <div className="flex-container size-lg-12">
                    <div className="flex-item size-lg-4">
                        <BlockContainer error={error}>
                            <DrawingMapFiltersAdvanced
                                serviceOptions={Object.values(serviceOptions)}
                                selectedService={serviceOptions[serviceID]}
                                statusOptions={Object.values(statusOptions)}
                                selectedStatus={statusOptions[status]}
                                operativeOptions={operatives}
                                selectedOperative={companyUserIDs}
                                fromDateInclusive={fromDateInclusive}
                                toDateInclusive={toDateInclusive}
                                pins={pins}
                                handleChangeFilter={this.handleChangeFilter}
                                handleDateChange={this.handleDateChange}
                                dateError={dateError}
                            />
                        </BlockContainer>
                    </div>
                    <div className="flex-item size-lg-4">
                        <DrawingDetailsContainer />
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
                        updating={drawing.isFloorplanUpdating}
                        updateMessage={updateMessage}
                    />
                </BlockContainer>
            </>
        );
    }

    componentDidMount = () => {
        this._resetCoordinates();
        const {
            drawing = {},
            postFilters,
            updateReportFilter,
            match,
            fetchSingleDrawing
        } = this.props;

        updateReportFilter('drawingID', match.params.id).then(postFilters);
        if (drawing.isFloorplanUpdating) {
            this._floorplanInterval = setInterval(() => {
                fetchSingleDrawing(drawing.id);
            }, 5000);
        }
    };

    componentDidUpdate = ({
        postSuccess: prevSuccess,
        drawing: prevDrawing = {},
        pinsFromAPI: prevPinsFromAPI = [],
        handleChange,
        fromDateInclusive,
        toDateInclusive,
        fieldErrors
    }) => {
        const {
            drawing = {},
            fetchSingleDrawing,
            postSuccess,
            pinsFromAPI = [],
            removeFieldError
        } = this.props;
        // re-fetch drawing every 5 seconds until the updated floorplan is retrieved
        if (postSuccess && !prevSuccess) fetchSingleDrawing(drawing.id);
        if (drawing.isFloorplanUpdating && !prevDrawing.isFloorplanUpdating) {
            this._floorplanInterval = setInterval(
                () => fetchSingleDrawing(drawing.id),
                5000
            );
        }
        if (
            fieldErrors.fromDateInclusive &&
            moment(fromDateInclusive) <= moment(toDateInclusive)
        ) {
            removeFieldError('fromDateInclusive');
            removeFieldError('toDateInclusive');
        }
        if (!drawing.isFloorplanUpdating && prevDrawing.isFloorplanUpdating) {
            clearInterval(this._floorplanInterval);
        }
        if (pinsFromAPI.length !== prevPinsFromAPI.length) {
            const pinIDs = pinsFromAPI.map(({ id }) => id);
            handleChange('pinIDs', pinIDs);
        }
    };

    handleChangeFilter = (name, val) => {
        const { handleChange, postFilters } = this.props;
        handleChange(name, val).then(postFilters);
    };

    componentWillUnmount = () => clearInterval(this._floorplanInterval);

    handleClick = e => {
        const { lat, lng } = e.latlng;

        if (this.state.addMode) this._updateCoordinates(lat, lng);
    };

    handleClearPinCache = () => {
        const { drawing } = this.props;
        localStorage.removeItem(`pinCache/${drawing.id}`);
    };

    handleDateChange = (date, name) => {
        const { handleChange, postFilters } = this.props;
        handleChange(name, date).then(postFilters);
    };

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

    _updateCoordinates = (addPinLat, addPinLng) => {
        const { updatePinCoordinates } = this.props;
        updatePinCoordinates('lat', addPinLat);
        updatePinCoordinates('lng', addPinLng);
        this.setState({ addPinLat, addPinLng });
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
        const {
            pins,
            filters: { pinIDs }
        } = this.props;
        const filterPins = pins.filter(({ id }) => pinIDs.includes(id));
        return filterPins;
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { pins, isFetching, error },
            servicesReducer: { services },
            companyUsersReducer: { users },
            drawingsReducer: { drawings, postSuccess },
            addPinCoordinatesReducer: { coordinates },
            reportsReducer: {
                customFilters: { pins: pinsFromAPI },
                filters: { pinIDs }
            }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id] || {},
    coordinates,
    pins: Object.values(pins),
    pinsFromAPI,
    pinIDs,
    users: Object.values(users),
    services: Object.values(services),
    isFetching,
    error,
    postSuccess
});

const mapDispatchToProps = {
    fetchSingleDrawing,
    updatePinCoordinates,
    showModal,
    updateFloorPlanConfirmed,
    updateReportFilter,
    removeFieldError
};

export default withRouter(
    withUpdateOnChange(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(DrawingMapGeneralContainer)
    )
);
