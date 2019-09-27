import React, { Component } from 'react';
import moment from 'moment';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';
import DrawingInspectionLogContainer from './DrawingInspectionLogContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { convertEnumToDropdownOptions, momentComparisonFormat, isEmpty } from 'helpers/generic';
import {
    PIN_STATUS_TYPES,
    RECTANGLE_MODES,
    FURTHER_FILTRATION_OPTIONS
} from 'constants/companyAdmin/enums';
import withUpdateOnChange from 'components/client/reports/createReport/components/hocs/withUpdateOnChange';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import BasicFiltersContainer from 'components/client/reports/createReport/components/containers/BasicFiltersContainer';
import DrawingDetailsContainer from './DrawingDetailsContainer';
import FurtherFiltrationContainer from 'components/client/reports/createReport/components/containers/FurtherFiltrationContainer';
import OutputSettingsContainer from 'components/client/reports/createReport/components/containers/OutputSettingsContainer';
import updateReportFilter from 'actions/client/reports/create/sync/clientUpdateReportFilter';
import addRectangle from 'actions/client/reports/create/sync/clientAddRectangle';
import removeRectangle from 'actions/client/reports/create/sync/clientRemoveRectangle';
import removeAllRectangles from 'actions/client/reports/create/sync/clientRemoveAllRectangles';
import updateFurtherFiltrationOption from 'actions/client/reports/create/sync/clientUpdateFurtherFiltrationOption';

const { ADD, DELETE, EXCLUDE } = RECTANGLE_MODES;
const { PIN_SELECTOR } = FURTHER_FILTRATION_OPTIONS;

class DrawingMapGeneralContainer extends Component {
    state = {
        position: [-128, 128],
        mapZoom: 3,
        updating: false,
        // in state instead of in render method, recalculating each time
        serviceOptions: {},
        operativeOptions: {},
        statusOptions: convertEnumToDropdownOptions(PIN_STATUS_TYPES),
        firstCorner: null,
        mode: ADD,
        currentTooltip: null
    };

    render() {
        const { mapZoom, position, updating, firstCorner, mode } = this.state;

        const { error, drawing = {}, furtherFiltrationOption, rectangles } = this.props;

        const cornerClicked = firstCorner;
        const isExcluding = +mode === EXCLUDE;

        const shouldShowPinSelectorOptions = +furtherFiltrationOption === +PIN_SELECTOR;

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
                        position={position}
                        zoom={mapZoom}
                        drawing={drawing}
                        pins={this._getFilteredPins()}
                        updating={updating}
                        updateCurTooltip={this.updateCurTooltip}
                        currentTooltip={this.state.currentTooltip}
                        handleClick={this.handleClick}
                        cornerClicked={cornerClicked}
                        shouldShowPinSelectorOptions={shouldShowPinSelectorOptions}
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
                {/* <div className="flex-container size-lg-12">
                    <div className="flex-item small-text-table size-lg-3">
                        <DrawingDocumentsContainer />
                    </div>

                    <div className="flex-item small-text-table two-line size-lg-3">
                        <DrawingCompaniesAccessContainer />
                    </div>
                </div> */}
            </>
        );
    }
    componentDidMount = () => {
        const {
            drawing = {},
            postFilters,
            updateReportFilter,
            match,
            fetchSingleDrawing,
            pinsFromAPI = [],
            handleChange
        } = this.props;

        const pinIDs = pinsFromAPI.map(({ id }) => id);
        handleChange('pinIDs', pinIDs);

        if (drawing.siteID) {
            handleChange('siteID', String(drawing.siteID));
            handleChange('buildingID', String(drawing.buildingID));
            handleChange('floorID', String(drawing.floorID));
        }

        updateReportFilter('drawingID', match.params.id).then(postFilters);
        if (drawing.isFloorplanUpdating) {
            this._floorplanInterval = setInterval(() => {
                fetchSingleDrawing(drawing.id);
            }, 5000);
        }
    };

    componentDidUpdate = ({
        drawing: prevDrawing = {},
        isFetching: prevIsFetching,
        pinsFromAPI: prevPinsFromAPI = []
    }) => {
        const {
            drawing = {},
            isFetching,
            pinsFromAPI = [],
            handleChange,
            fieldErrors,
            removeFieldError,
            fromDateInclusive,
            toDateInclusive
        } = this.props;

        // ! need this here as well as on mount because unlike companyAdmin, the drawing is sometimes empty when it gets here.
        if (isEmpty(prevDrawing) && !isEmpty(drawing)) {
            if (drawing.siteID) {
                handleChange('siteID', String(drawing.siteID));
                handleChange('buildingID', String(drawing.buildingID));
                handleChange('floorID', String(drawing.floorID));
            }
        }
        // when the component has finished fetching all the options, run get services options once instead of in every render
        if (!isFetching && prevIsFetching) {
            const serviceOptions = this._getServicesOptions();
            // const operativeOptions = this._getOperativeOptions();
            this.setState({ serviceOptions });
        }
        if (drawing.tilesetS3Key !== prevDrawing.tilesetS3Key) {
            clearInterval(this._floorplanInterval);
            this.setState({ updating: false });
        }

        if (pinsFromAPI.length !== prevPinsFromAPI.length) {
            const pinIDs = pinsFromAPI.map(({ id }) => id);
            handleChange('pinIDs', pinIDs);
        }

        if (fieldErrors.fromDateInclusive && moment(fromDateInclusive) <= moment(toDateInclusive)) {
            removeFieldError('fromDateInclusive');
            removeFieldError('toDateInclusive');
        }
    };

    handleChange = (name, value) => {
        const { handleChange, postFilters } = this.props;
        this.setState({ [name]: value });
        handleChange(name, value).then(postFilters);
    };

    handleDateChange = (date, name) => {
        this.setState({ [name]: date });
        const { handleChange, postFilters } = this.props;
        handleChange(name, date).then(postFilters);
    };

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

    _getServicesOptions = () => {
        const { services, pins } = this.props;

        const servicesOnDrawing = pins.reduce((acc, { latestServiceID }) => {
            if (!acc.includes(latestServiceID)) acc.push(latestServiceID);
            return acc;
        }, []);

        return services.reduce((acc, { id, name }) => {
            if (servicesOnDrawing.includes(id)) acc[id] = { value: id, text: name };

            return acc;
        }, {});
    };

    //  !operative information not available at drawing level yet
    // _getOperativeOptions = () => {
    //     const { operatives } = this.props;

    //     return operatives.reduce(
    //         (acc, { id, userFirstName, userLastName, userEmail }) => {
    //             acc[id] = {
    //                 value: id,
    //                 text: `${userFirstName} ${userLastName} <${userEmail}>`
    //             };
    //             return acc;
    //         },
    //         {}
    //     );
    // };

    _getFilteredPins = () => {
        const { pins, filters, furtherFiltrationOption } = this.props;
        // ? Displays all pins if in rectangle mode, and only the selected pins otherwise.

        const {
            fromDateInclusive,
            toDateInclusive,
            status,
            serviceID,
            templateID,
            companyUserIDs
        } = filters;
        const NO = false;
        // simple
        return furtherFiltrationOption <= FURTHER_FILTRATION_OPTIONS.INDIVIDUAL_PINS
            ? pins.filter(pin => {
                  // start date
                  if (
                      fromDateInclusive &&
                      moment(pin.createdOn) < moment(fromDateInclusive, momentComparisonFormat)
                  ) {
                      return NO;
                  }
                  // end date
                  if (
                      toDateInclusive &&
                      moment(pin.createdOn) > moment(toDateInclusive, momentComparisonFormat)
                  ) {
                      return NO;
                  }
                  // status
                  if (status && +pin.latestStatus !== +status) {
                      return NO;
                  }
                  // services
                  if (serviceID && +pin.latestServiceID !== +serviceID) {
                      return NO;
                  }
                  // templates
                  if (templateID && +templateID !== pin.templateID) {
                      return NO;
                  }
                  // operatives
                  if (
                      companyUserIDs &&
                      companyUserIDs.length &&
                      !companyUserIDs.includes(pin.latestCreatedByCompanyUserID)
                  ) {
                      return NO;
                  }
                  if (+furtherFiltrationOption === FURTHER_FILTRATION_OPTIONS.INDIVIDUAL_PINS) {
                      if (!filters.pinIDs.includes(pin.id)) {
                          return NO;
                      }
                  }
                  return true;
              })
            : // advanced
              pins.filter(({ id }) => filters.pinIDs.includes(id));
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
    updateCurTooltip = id => {
        this.setState({ currentTooltip: id });
    };
}

const mapStateToProps = (
    {
        client: {
            pinsReducer: { pins, isFetching: fetchingPins, error },
            servicesReducer: { services, isFetching: fetchingServices },
            // drawingOperativesReducer: { users, isFetching: fetchingUsers },
            drawingsReducer: { drawings },
            reportsReducer: {
                filters: { pinIDs, templateID, companyUserIDs },
                customFilters: { pins: pinsFromAPI },
                furtherFiltrationOption,
                rectangles,
                isFetching: isFetchingReports
            }
        },
        shared: {
            fieldErrorsReducer: { fieldErrors }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id],
    pins: Object.values(pins),
    // operatives: Object.values(users),
    services: Object.values(services),
    isFetching: fetchingPins || fetchingServices,
    fieldErrors,
    error,
    pinIDs,
    pinsFromAPI,
    furtherFiltrationOption,
    companyUserIDs,
    rectangles: Object.values(rectangles)
});

const mapDispatchToProps = {
    removeFieldError,
    updateReportFilter,
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
