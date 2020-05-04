import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import clientUpdateReportFilter from 'actions/client/reports/create/sync/clientUpdateReportFilter';
import clientPostCustomFilters from 'actions/client/reports/create/async/clientPostCustomFilters';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import {
    convertArrToObj,
    getSelectedCompanyForClient,
    momentComparisonFormat,
} from 'helpers/generic';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import { FURTHER_FILTRATION_OPTIONS } from 'constants/companyAdmin/enums';

export default function (ProtectedComponent) {
    class WithUpdateOnChange extends React.Component {
        state = {
            showError: false,
        };
        render() {
            const { showError } = this.state;
            const { errorsVisible, fieldError, ...props } = this.props;

            return (
                <ProtectedComponent
                    {...props}
                    fieldError={showError || errorsVisible ? fieldError : null}
                    postFilters={this.postFilters}
                    formatArrForDropdown={this.formatArrForDropdown}
                    getFilteredPins={this._getFilteredPins}
                    validate={this.validate}
                    showFieldError={this.showFieldError}
                    getPostBody={this._getPostBody}
                />
            );
        }

        formatArrForDropdown = (arr, asObj) => {
            const options = arr.map(({ id, name }) => ({
                value: id,
                label: name,
                text: name,
            }));

            return asObj ? convertArrToObj(options, 'value') : options;
        };

        validate = errorMessage => {
            const { addFieldError, removeFieldError, blockName, fieldError } = this.props;

            if (errorMessage) {
                addFieldError(blockName, errorMessage);
            } else if (fieldError) {
                removeFieldError(blockName);
            }
        };

        showFieldError = () => {
            const { showError } = this.state;

            if (!showError) {
                this.setState({ showError: true });
            }
        };
        _getFilteredPins = pins => {
            const { filters, furtherFiltrationOption } = this.props;
            const { PIN_SELECTOR, INDIVIDUAL_PINS } = FURTHER_FILTRATION_OPTIONS;

            // ? Displays all pins if in rectangle mode, and only the selected pins otherwise.
            console.log({ pins });
            if (+furtherFiltrationOption > PIN_SELECTOR) {
                // advanced
                return pins.filter(({ id }) => filters.pinIDs.includes(id));
            }

            const {
                fromDateInclusive: startDate,
                toDateInclusive: endDate,
                status,
                serviceID,
                templateID,
                companyUserIDs,
            } = filters;

            const NO = false;
            const YES = true;

            const fromDateInclusive = this.getFilterStartDate(startDate);
            const toDateInclusive = this.getFilterEndDate(endDate);

            // simple
            return pins
                .filter(pin => {
                    // 2066696
                    // start date

                    if (
                        fromDateInclusive &&
                        moment(pin.latestCreatedOn) <
                            moment(fromDateInclusive, momentComparisonFormat)
                    ) {
                        return NO;
                    }
                    // end date
                    if (
                        toDateInclusive &&
                        moment(pin.latestCreatedOn) >
                            moment(toDateInclusive, momentComparisonFormat)
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
                    // if (
                    //     +furtherFiltrationOption ===
                    //     FURTHER_FILTRATION_OPTIONS.INDIVIDUAL_PINS
                    // ) {
                    //     if (!filters.pinIDs.includes(pin.id)) {
                    //         return NO;
                    //     }
                    // }
                    return YES;
                })
                .map(pin => ({
                    ...pin,
                    excluded:
                        (+furtherFiltrationOption === PIN_SELECTOR ||
                            +furtherFiltrationOption === INDIVIDUAL_PINS) &&
                        !filters.pinIDs.includes(pin.id),
                }));
        };
        _getPostBody = () => {
            const {
                filters: {
                    siteID,
                    buildingID,
                    floorID,
                    drawingID,
                    serviceID,
                    templateID,
                    status,
                    reportHistories,
                    includePinLocation,
                    isPDFGeneration,
                    isCSVGeneration,
                    isFloorplanGeneration,
                    includeFloorplan,
                    fromDateInclusive,
                    toDateInclusive,
                    companyUserIDs,
                    pinIDs,
                    floorplanPinScale,
                },
                furtherFiltrationOption,
                excludedPinIDs,
                rectangles,
                options: { showHidden, sortBy },
                fields,
            } = this.props;

            let hierarchyType;
            let hierarchyID;

            if (siteID) {
                hierarchyType = 'site';
                hierarchyID = siteID;
            }
            if (buildingID) {
                hierarchyType = 'building';
                hierarchyID = buildingID;
            }
            if (floorID) {
                hierarchyType = 'floor';
                hierarchyID = floorID;
            }
            if (drawingID) {
                hierarchyType = 'drawing';
                hierarchyID = drawingID;
            }

            let questionFilters = null;
            let selectedPinIDs = null;

            const {
                INDIVIDUAL_PINS,
                // PIN_SELECTOR,
                FILTERS,
            } = FURTHER_FILTRATION_OPTIONS;

            switch (+furtherFiltrationOption) {
                case INDIVIDUAL_PINS: {
                    selectedPinIDs = pinIDs.filter(
                        id => !Object.values(excludedPinIDs).includes(id),
                    );
                    break;
                }
                case FILTERS: {
                    questionFilters = fields.map(
                        ({ selectedQuestions, questionValues = [], selectedValues = [] }) => {
                            let values = questionValues.length ? questionValues : selectedValues;

                            return {
                                questionGroupKeys: selectedQuestions,
                                values,
                            };
                        },
                    );
                    break;
                }
                default:
                    break;
            }

            const getLatLng = corner => {
                const [latY, lngX] = corner;
                return { latY, lngX };
            };

            const pinBoundingBoxes = Object.values(
                rectangles,
            ).map(({ corners: [first, second] }) => [getLatLng(first), getLatLng(second)]);

            const endDate = toDateInclusive ? moment(toDateInclusive).endOf('day').toDate() : null;

            const body = {
                hierarchyType,
                hierarchyID,
                reportHistories: reportHistories || null,
                includePinLocation,
                isPDFGeneration,
                isCSVGeneration,
                isFloorplanGeneration,
                includeFloorplan,
                fromDateInclusive,
                toDateInclusive: endDate,
                companyUserIDs,
                excludedPinIDs: Object.values(excludedPinIDs),
                pinIDs: selectedPinIDs,
                serviceID: serviceID || null,
                templateID: templateID || null,
                status: status || null,
                questionFilters,
                showHidden,
                sortBy,
                pinBoundingBoxes,
                floorplanPinScale,
            };

            return body;
        };

        postFilters = () => {
            const { postCustomFilters, furtherFiltrationOption } = this.props;
            if (furtherFiltrationOption > FURTHER_FILTRATION_OPTIONS.INDIVIDUAL_PINS) {
                const selectedCompanyID = getSelectedCompanyForClient();
                return postCustomFilters(selectedCompanyID, this._getPostBody());
            }
        };

        getFilterStartDate = date => {
            const companyID = getSelectedCompanyForClient();
            const { companies } = this.props;
            const company = companies[companyID] || {};
            const { timeZone = 'Europe/London' } = company;
            return date ? moment.tz(date, timeZone).startOf('day').utc().toISOString() : null;
        };
        getFilterEndDate = date => {
            const companyID = getSelectedCompanyForClient();
            const { companies } = this.props;
            const company = companies[companyID] || {};
            const { timeZone = 'Europe/London' } = company;
            const endDate = date
                ? moment.tz(date, timeZone.name).add('days', 1).startOf('day').utc().toISOString()
                : null;
            return endDate;
        };
    }

    const mapStateToProps = (
        {
            shared: {
                fieldErrorsReducer: { fieldErrors, errorsVisible },
            },
            client: {
                servicesReducer: { historicServices },
                sitesReducer,
                buildingsReducer,
                floorsReducer,
                drawingsReducer,
                reportsReducer: {
                    filters,
                    fields,
                    options,
                    postSuccess,
                    error,
                    customFilters,
                    excludedPinIDs,
                    furtherFiltrationOption,
                    rectangles,
                },
                companiesReducer: { companies },
            },
        },
        { blockName },
    ) => {
        const selectedSite = sitesReducer.sites[filters.siteID] || {};
        const buildingIDs = selectedSite.buildingIDs || [];
        const buildings = buildingIDs.map(id => buildingsReducer.buildings[id]);

        const selectedBuilding = buildingsReducer.buildings[filters.buildingID] || {};
        const floorIDs = selectedBuilding.floorIDs || [];
        const floors = floorIDs.map(id => floorsReducer.floors[id]);

        const selectedFloor = floorsReducer.floors[filters.floorID] || {};
        const drawingIDs = selectedFloor.drawingIDs || [];
        const drawings = drawingIDs.map(id => drawingsReducer.drawings[id]);

        return {
            fieldErrors,
            fieldError: fieldErrors[blockName],
            errorsVisible,
            filters,
            customFilters,
            options,
            postSuccess,
            error,
            services: Object.values(historicServices),
            sites: Object.values(sitesReducer.sites),
            buildings,
            floors,
            drawings,
            fields: Object.values(fields),
            excludedPinIDs: excludedPinIDs,
            furtherFiltrationOption,
            rectangles,
            companies,
        };
    };

    const mapDispatchToProps = dispatch => ({
        handleChange: (name, val) => dispatch(clientUpdateReportFilter(name, val)),
        postCustomFilters: (companyID, postBody) =>
            dispatch(clientPostCustomFilters(companyID, postBody)),
        addFieldError: (name, val) => dispatch(addFieldError(name, val)),
        removeFieldError: name => dispatch(removeFieldError(name)),
        showFieldErrors: () => dispatch(showFieldErrors()),
    });

    return connect(mapStateToProps, mapDispatchToProps)(WithUpdateOnChange);
}
