import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import uuid from 'uuid/v4';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import updatePinCoordinates from 'actions/companyAdmin/drawings/sync/updatePinCoordinates';
import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';
import DrawingInspectionLogContainer from './DrawingInspectionLogContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { convertArrToObj } from 'helpers/generic';
import {
    COMPANY_USER_ROLE_TYPES as USER_ROLE,
    FLOORPLAN_STATE_MESSAGES,
    RECTANGLE_MODES,
    FURTHER_FILTRATION_OPTIONS,
} from 'constants/companyAdmin/enums';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import updateFloorPlanConfirmed from 'actions/companyAdmin/drawings/sync/updateFloorPlanConfirmed';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import setZoneAddMode from 'actions/companyAdmin/zones/sync/setZoneAddMode';
import setZonesOpacity from 'actions/companyAdmin/zones/sync/setZonesOpacity';
import togglePinIconView from 'actions/companyAdmin/pins/sync/togglePinIconView';
import togglePinTasksView from 'actions/companyAdmin/pins/sync/togglePinTasksView';
import fetchAllTemplates from 'actions/companyAdmin/templates/async/fetchAllTemplates';
import withUpdateOnChange from 'components/companyAdmin/reports/createReport/components/hocs/withUpdateOnChange';
import DrawingDetailsContainer from './DrawingDetailsContainer';
import FurtherFiltrationContainer from 'components/companyAdmin/reports/createReport/components/containers/FurtherFiltrationContainer';
import OutputSettingsContainer from 'components/companyAdmin/reports/createReport/components/containers/OutputSettingsContainer';
import BasicFiltersContainer from 'components/companyAdmin/reports/createReport/components/containers/BasicFiltersContainer';
import addRectangle from 'actions/companyAdmin/reports/sync/addRectangle';
import removeRectangle from 'actions/companyAdmin/reports/sync/removeRectangle';
import removeAllRectangles from 'actions/companyAdmin/reports/sync/removeAllRectangles';
import updateFurtherFiltrationOption from 'actions/companyAdmin/reports/sync/updateFurtherFiltrationOption';
import { VIEW_ZONES, ADD_DRAWING_ZONE } from 'constants/shared/modalTypes';

const { ADD, DELETE, EXCLUDE } = RECTANGLE_MODES;
const { PIN_SELECTOR } = FURTHER_FILTRATION_OPTIONS;

// ! The pin selector code is repeated in the filtermapcontainer component
// use smaller generic components within

class DrawingMapGeneralContainer extends Component {
    state = {
        mapZoom: 3,
        addMode: false,
        addPinLat: -128,
        addPinLng: 128,
        centerLat: -128,
        centerLng: 128,
        firstCorner: null,
        mode: ADD,
        currentTooltip: null,
        shouldRestrictPayments: false,
        showZones: false,
        curZoom: 3,
    };

    render() {
        const {
            mapZoom,
            addMode,
            addPinLat,
            addPinLng,
            centerLat,
            centerLng,
            firstCorner,
            mode,
            shouldRestrictPayments,
            showZones,
            curZoom,
        } = this.state;
        const {
            error,
            drawing,
            furtherFiltrationOption,
            rectangles,
            isAddingZone,
            zonesOpacity,
            zones,
            pinViewMode,
            pinTasksMode,
            togglePinIconView,
            togglePinTasksView,
        } = this.props;
        const position = [centerLat, centerLng];
        const addPinPosition = [addPinLat, addPinLng];
        const cornerClicked = firstCorner;
        const isExcluding = +mode === EXCLUDE;

        const updateMessage = FLOORPLAN_STATE_MESSAGES[drawing.latestFloorplanState];

        const shouldShowPinSelectorOptions = +furtherFiltrationOption === +PIN_SELECTOR;

        const isExpired = moment(drawing.expiresOn).isBefore(moment.now());

        const drawingNotStarted = moment(Date.now()).isBefore(drawing.startDate);

        return (
            <>
                {!drawingNotStarted && (
                    <div className="flex-container size-lg-12">
                        <div className="flex-item size-lg-4 size-md-12">
                            <BasicFiltersContainer isDrawingPage />
                        </div>
                        <div className="flex-item size-lg-4 size-md-12">
                            <DrawingDetailsContainer />
                        </div>
                        <DrawingInspectionLogContainer />
                    </div>
                )}
                <BlockContainer error={error} isEmpty={!drawing}>
                    <DrawingMapViewSimple
                        isExpired={isExpired}
                        currentTooltip={this.state.currentTooltip}
                        updateCurTooltip={this.updateCurTooltip}
                        showModal={this.props.showModal}
                        position={position}
                        addPinPosition={addPinPosition}
                        zoom={mapZoom}
                        pins={this.props.getFilteredPins(this.props.pins, pinTasksMode)}
                        handleClick={this.handleClick}
                        cornerClicked={cornerClicked}
                        drawing={drawing}
                        addMode={addMode}
                        handleClearPinCache={this.handleClearPinCache}
                        toggleAddMode={this.toggleAddMode}
                        history={this.props.history}
                        updating={drawing.isFloorplanUpdating}
                        updateMessage={updateMessage}
                        shouldShowPinSelectorOptions={shouldShowPinSelectorOptions}
                        setMode={this.setMode}
                        rectangles={rectangles}
                        handleDelete={this.handleDelete}
                        mode={mode}
                        handleCancelPinSelector={this.handleCancelPinSelector}
                        isExcluding={isExcluding}
                        shouldRestrictPayments={shouldRestrictPayments}
                        isAddingZone={isAddingZone}
                        handleZoneAdd={this.handleZoneAdd}
                        cancelZoneAdd={this.cancelZoneAdd}
                        zones={zones}
                        toggleZones={this.toggleZones}
                        showZones={showZones}
                        zonesOpacity={zonesOpacity}
                        handleOpacityChange={this.handleOpacityChange}
                        showAddZoneModal={this.showAddZoneModal}
                        hasZoneCoords={!!this.props.zoneFormCoordinates}
                        handleZoomChange={this.handleZoomChange}
                        curZoom={curZoom}
                        drawingNotStarted={drawingNotStarted}
                        pinViewMode={pinViewMode}
                        pinTasksMode={pinTasksMode}
                        togglePinIconView={togglePinIconView}
                        togglePinTasksView={togglePinTasksView}
                    />
                </BlockContainer>
                {!drawingNotStarted && (
                    <>
                        <FurtherFiltrationContainer />
                        <OutputSettingsContainer />
                    </>
                )}
            </>
        );
    }

    componentDidMount = () => {
        this._resetCoordinates();
        const {
            drawing = {},
            postFilters,
            updateReportFilter,
            fetchSingleDrawing,
            pinsFromAPI = [],
            handleChange,
            objectUsers,
            companyUserID,
            drawingID,
        } = this.props;
        if (objectUsers && objectUsers[companyUserID]) {
            this.setState({
                shouldRestrictPayments: objectUsers[companyUserID].shouldRestrictPayments,
            });
        }
        const pinIDs = pinsFromAPI.map(({ id }) => id);
        handleChange('pinIDs', pinIDs);
        if (drawing.siteID) {
            handleChange('siteID', [drawing.siteID]);
            handleChange('buildingID', [drawing.buildingID]);
            handleChange('floorID', [drawing.floorID]);
        }

        updateReportFilter('drawingID', [+drawingID]);
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
        fromDateInclusive,
        toDateInclusive,
        fieldErrors,
        rectangles: prevRectangles,
        furtherFiltrationOption: prevOption,
        objectUsers: prevUsers,
        isModified: prevIsModified,
    }) => {
        const { showZones } = this.state;

        const {
            drawing = {},
            handleChange,
            fetchSingleDrawing,
            postSuccess,
            pinsFromAPI = [],
            removeFieldError,
            rectangles,
            postFilters,
            furtherFiltrationOption,
            removeAllRectangles,
            objectUsers,
            companyUserID,
            isModified,
        } = this.props;
        // re-fetch drawing every 5 seconds until the updated floorplan is retrieved
        if (postSuccess && !prevSuccess) fetchSingleDrawing(drawing.id);
        if (drawing.isFloorplanUpdating && !prevDrawing.isFloorplanUpdating) {
            // console.error('updating!!!!!');
            this._floorplanInterval = setInterval(() => fetchSingleDrawing(drawing.id), 5000);
        }
        if (fieldErrors.fromDateInclusive && moment(fromDateInclusive) <= moment(toDateInclusive)) {
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

        if (furtherFiltrationOption !== prevOption) {
            removeAllRectangles();
        }

        if (drawing.siteID && !prevDrawing.siteID) {
            handleChange('siteID', [+drawing.siteID]);
            handleChange('buildingID', [+drawing.buildingID]);
            handleChange('floorID', [+drawing.floorID]);
        }

        if (objectUsers && objectUsers[companyUserID] && !prevUsers[companyUserID]) {
            this.setState({
                shouldRestrictPayments: objectUsers[companyUserID].shouldRestrictPayments,
            });
        }

        if (!prevIsModified && isModified && showZones) {
            this.setState(
                {
                    showZones: false,
                },
                () => {
                    this.setState({
                        showZones: true,
                    });
                },
            );
        }
    };

    updateCurTooltip = id => {
        this.setState({ currentTooltip: id });
    };

    componentWillUnmount = () => clearInterval(this._floorplanInterval);

    handleClick = e => {
        const { lat, lng } = e.latlng;
        const { mode, firstCorner } = this.state;
        const { addRectangle, furtherFiltrationOption } = this.props;
        if (+furtherFiltrationOption === +PIN_SELECTOR && mode === ADD) {
            if (!firstCorner) {
                this.setState({ firstCorner: [lat, lng] });
            } else {
                const id = uuid();
                const secondCorner = [lat, lng];
                addRectangle(id, firstCorner, secondCorner);
                this.setState({ firstCorner: null });
            }
        }

        if (this.state.addMode) this._updateCoordinates(lat, lng);
    };

    handleClearPinCache = () => {
        const { drawing, history, location } = this.props;
        localStorage.removeItem(`pinCache/${drawing.id}`);
        history.replace(`${location.pathname}/add-pin`);
    };

    handleOpacityChange = value => {
        const { setZonesOpacity } = this.props;

        setZonesOpacity(value);
    };

    handleDateChange = (date, name) => {
        const { handleChange, postFilters } = this.props;
        handleChange(name, date);
    };

    toggleAddMode = () => {
        this.setState({ addMode: !this.state.addMode });
        this._resetCoordinates();
    };

    _resetCoordinates = () => {
        const { updatePinCoordinates } = this.props;

        updatePinCoordinates('lat', -128);
        updatePinCoordinates('lng', 128);

        this.setState({
            addPinLat: -128,
            addPinLng: 128,
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
                text: `${userFirstName} ${userLastName} <${userEmail}>`,
            }));
        return convertArrToObj(options, 'value');
    };

    setMode = mode => {
        this.setState({ mode, firstCorner: null });
    };

    handleDelete = id => {
        const { mode } = this.state;
        const { removeRectangle } = this.props;
        if (mode === DELETE) removeRectangle(id);
    };

    handleCancelPinSelector = () => {
        const { removeAllRectangles, updateFurtherFiltrationOption } = this.props;
        updateFurtherFiltrationOption(FURTHER_FILTRATION_OPTIONS.NONE);
        removeAllRectangles();
    };

    handleZoneAdd = () => {
        const { showModal } = this.props;

        showModal(VIEW_ZONES);
    };

    cancelZoneAdd = () => {
        const { setZoneAddMode } = this.props;

        setZoneAddMode(false);
    };

    toggleZones = () => {
        const { showZones } = this.state;

        this.setState({
            showZones: !showZones,
        });
    };

    handleCreateZoneFinish = () => {
        const { setZoneAddMode } = this.props;
        setZoneAddMode(false);

        this.setState({
            showZones: true,
        });
    };

    showAddZoneModal = () => {
        const { showModal, drawingID } = this.props;

        showModal(ADD_DRAWING_ZONE, {
            handleCreateZoneFinish: this.handleCreateZoneFinish,
            drawingID,
        });
    };

    handleZoomChange = zoomLevel => {
        this.setState({
            curZoom: zoomLevel,
        });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { pins, isFetching, error, pinViewMode, pinTasksMode },
            servicesReducer: { services },
            companyUsersReducer: { users },
            drawingsReducer: { drawings, postSuccess },
            addPinCoordinatesReducer: { coordinates },
            reportsReducer: {
                customFilters: { pins: pinsFromAPI },
                filters: { pinIDs, templateID, companyUserIDs },
                furtherFiltrationOption,
                rectangles,
                isFetching: isFetchingReports,
            },
            zonesReducer: { isAddMode, isModified, zonesOpacity, zoneFormCoordinates, zones },
        },
        shared: {
            decodeJWTReducer: {
                jwtData: { companyUserID },
            },
        },
    },
    { match },
) => ({
    drawingID: match.params.id,
    drawing: drawings[match.params.id] || {},
    coordinates,
    pins: Object.values(pins),
    pinsFromAPI,
    pinIDs,
    templateID,
    users: Object.values(users),
    objectUsers: users,
    services: Object.values(services),
    isFetching,
    isFetchingReports,
    error,
    postSuccess,
    furtherFiltrationOption,
    rectangles: Object.values(rectangles),
    companyUserIDs,
    companyUserID,
    isAddingZone: isAddMode,
    zonesOpacity,
    zoneFormCoordinates,
    isModified,
    zones,
    pinViewMode,
    pinTasksMode,
});

const mapDispatchToProps = {
    fetchSingleDrawing,
    updatePinCoordinates,
    showModal,
    updateFloorPlanConfirmed,
    updateReportFilter,
    removeFieldError,
    addRectangle,
    removeRectangle,
    removeAllRectangles,
    updateFurtherFiltrationOption,
    setZoneAddMode,
    setZonesOpacity,
    togglePinIconView,
    togglePinTasksView,
    fetchAllTemplates,
};

export default withRouter(
    withUpdateOnChange(connect(mapStateToProps, mapDispatchToProps)(DrawingMapGeneralContainer)),
);
