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
import { convertArrToObj, momentComparisonFormat } from 'helpers/generic';
import {
    COMPANY_USER_ROLE_TYPES as USER_ROLE,
    FLOORPLAN_STATE_MESSAGES,
    RECTANGLE_MODES,
    FURTHER_FILTRATION_OPTIONS
} from 'constants/companyAdmin/enums';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import updateFloorPlanConfirmed from 'actions/companyAdmin/drawings/sync/updateFloorPlanConfirmed';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import withUpdateOnChange from 'components/companyAdmin/reports/createReport/components/hocs/withUpdateOnChange';
import DrawingDetailsContainer from './DrawingDetailsContainer';
import FurtherFiltrationContainer from 'components/companyAdmin/reports/createReport/components/containers/FurtherFiltrationContainer';
import OutputSettingsContainer from 'components/companyAdmin/reports/createReport/components/containers/OutputSettingsContainer';
import BasicFiltersContainer from 'components/companyAdmin/reports/createReport/components/containers/BasicFiltersContainer';
import addRectangle from 'actions/companyAdmin/reports/sync/addRectangle';
import removeRectangle from 'actions/companyAdmin/reports/sync/removeRectangle';
import removeAllRectangles from 'actions/companyAdmin/reports/sync/removeAllRectangles';
import updateFurtherFiltrationOption from 'actions/companyAdmin/reports/sync/updateFurtherFiltrationOption';
const { ADD, DELETE, EXCLUDE } = RECTANGLE_MODES;
const { PIN_SELECTOR } = FURTHER_FILTRATION_OPTIONS;

// ! The pin selector code is repeated in the filtermapcontainer component
// todo tidy this and maybe make them use the same component or use smaller generic components within

class DrawingMapGeneralContainer extends Component {
    state = {
        mapZoom: 3,
        addMode: false,
        addPinLat: 51.505,
        addPinLng: -0.09,
        centerLat: 51.505,
        centerLng: -0.09,
        firstCorner: null,
        mode: ADD
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
            mode
        } = this.state;
        const {
            error,
            drawing,
            furtherFiltrationOption,
            rectangles
        } = this.props;
        const position = [centerLat, centerLng];
        const addPinPosition = [addPinLat, addPinLng];
        const cornerClicked = firstCorner;
        const isExcluding = +mode === EXCLUDE;

        const updateMessage =
            FLOORPLAN_STATE_MESSAGES[drawing.latestFloorplanState];

        const shouldShowPinSelectorOptions =
            +furtherFiltrationOption === +PIN_SELECTOR;
        return (
            <>
                <div className="flex-container size-lg-12">
                    <div className="flex-item size-lg-4">
                        <BasicFiltersContainer isDrawingPage />
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
                        cornerClicked={cornerClicked}
                        drawing={drawing}
                        addMode={addMode}
                        handleClearPinCache={this.handleClearPinCache}
                        toggleAddMode={this.toggleAddMode}
                        history={this.props.history}
                        updating={drawing.isFloorplanUpdating}
                        updateMessage={updateMessage}
                        shouldShowPinSelectorOptions={
                            shouldShowPinSelectorOptions
                        }
                        setMode={this.setMode}
                        rectangles={rectangles}
                        handleDelete={this.handleDelete}
                        mode={mode}
                        handleCancelPinSelector={this.handleCancelPinSelector}
                        isExcluding={isExcluding}
                    />
                </BlockContainer>
                <FurtherFiltrationContainer />
                <OutputSettingsContainer />
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
        fieldErrors,
        rectangles: prevRectangles,
        furtherFiltrationOption: prevOption
    }) => {
        const {
            drawing = {},
            fetchSingleDrawing,
            postSuccess,
            pinsFromAPI = [],
            removeFieldError,
            rectangles,
            postFilters,
            furtherFiltrationOption,
            removeAllRectangles
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

        // pin selector stuff
        if (rectangles.length !== prevRectangles.length) {
            postFilters();
        }
        if (furtherFiltrationOption !== prevOption) {
            removeAllRectangles();
        }
    };

    handleChangeFilter = (name, val) => {
        const { handleChange, postFilters } = this.props;
        handleChange(name, val).then(postFilters);
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
        const { pins, filters, furtherFiltrationOption } = this.props;

        // ? Displays all pins if in rectangle mode, and only the selected pins otherwise.
        if (+furtherFiltrationOption === +PIN_SELECTOR) {
            const {
                fromDateInclusive,
                toDateInclusive,
                status,
                serviceID
            } = filters;
            return pins.filter(pin => {
                if (
                    fromDateInclusive &&
                    moment(pin.createdOn) <
                        moment(fromDateInclusive, momentComparisonFormat)
                ) {
                    return false;
                }
                if (
                    toDateInclusive &&
                    moment(pin.createdOn) >
                        moment(toDateInclusive, momentComparisonFormat)
                ) {
                    return false;
                }
                if (status && +pin.latestStatus !== +status) {
                    return false;
                }
                if (serviceID && +pin.latestServiceID !== +serviceID) {
                    return false;
                }
                return true;
            });
        }
        return pins.filter(({ id }) => filters.pinIDs.includes(id));
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
        const {
            removeAllRectangles,
            updateFurtherFiltrationOption
        } = this.props;
        updateFurtherFiltrationOption(FURTHER_FILTRATION_OPTIONS.NONE);
        removeAllRectangles();
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
                filters: { pinIDs },
                furtherFiltrationOption,
                rectangles
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
    postSuccess,
    furtherFiltrationOption,
    rectangles: Object.values(rectangles)
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
    updateFurtherFiltrationOption
};

export default withRouter(
    withUpdateOnChange(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(DrawingMapGeneralContainer)
    )
);
