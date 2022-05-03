import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { convertArrToObj, isEmpty } from 'helpers/generic';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import { FURTHER_FILTRATION_OPTIONS, HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import getOperativeOptions from 'actions/companyAdmin/reports/async/getOperativeOptions';
import getTemplateReportOptions from 'actions/companyAdmin/reports/async/getTemplateReportOptions';
import getServiceReportOptions from 'actions/companyAdmin/reports/async/getServiceReportOptions';
import getCompanyReportOptions from 'actions/companyAdmin/reports/async/getCompanyReportOptions';

export default function (ProtectedComponent) {
    class WithUpdateOnChange extends React.Component {
        state = {
            showError: false,
        };
        render() {
            const { showError } = this.state;
            const { errorsVisible, fieldError, ...props } = this.props;
            const { hierarchyType, hierarchyID } = this._getHierarchyValues();

            return (
                <ProtectedComponent
                    {...props}
                    fieldError={showError || errorsVisible ? fieldError : null}
                    formatArrForDropdown={this.formatArrForDropdown}
                    validate={this.validate}
                    showFieldError={this.showFieldError}
                    getPostBody={this._getPostBody}
                    getFilteredPins={this._getFilteredPins}
                    getTemplateOptions={this.props.getTemplateOptions}
                    hierarchyType={hierarchyType}
                    hierarchyID={hierarchyID}
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

        formatArrForDropdownOperative = arr => {
            const options = arr.map(({ id, name, companyName }) => ({
                value: id,
                label: `${name} ${companyName ? `(${companyName})` : ''}`,
                text: `${name} ${companyName ? `(${companyName})` : ''}`,
            }));

            return options;
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

        _getFilteredPins = (pins, filterByTasks = false) => {
            const { filters, furtherFiltrationOption } = this.props;
            const { PIN_SELECTOR, INDIVIDUAL_PINS, ZONES } = FURTHER_FILTRATION_OPTIONS;

            // ? Displays all pins if in rectangle mode, and only the selected pins otherwise.
            if (+furtherFiltrationOption > PIN_SELECTOR && +furtherFiltrationOption !== ZONES) {
                // advanced
                return pins.filter(({ id }) => filters.pinIDs.includes(id));
            }

            const { status, serviceID, templateID, companyUserIDs, createdByCompanyID } = filters;

            const NO = false;
            const YES = true;

            const [from, to] = this._getDateTimeFilters();

            // simple
            return pins
                .filter(pin => {
                    // 2066696
                    // start date
                    // if (pin.id === 3233480) {
                    //     console.log('{pin}');
                    //     console.log(moment(pin.latestCreatedOn).utc(true).toISOString());
                    //     console.log(from && moment(from).toISOString());
                    //     console.log(to && moment(to).toISOString());
                    //     console.log('{pin}');
                    // }

                    if (from && moment(pin.latestCreatedOn).utc(true) < moment(from)) {
                        return NO;
                    }

                    // end date
                    if (to && moment(pin.latestCreatedOn).utc(true) > moment(to)) {
                        return NO;
                    }

                    // status
                    if (
                        status &&
                        !isEmpty(status) &&
                        !status.some(item => +item === +pin.latestStatus)
                    ) {
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
                    // companies
                    if (createdByCompanyID && createdByCompanyID !== pin.companyID) {
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
                    // pin tasks
                    if (filterByTasks && !pin.hasPinTask) {
                        return NO;
                    }

                    return YES;
                })
                .map(pin => {
                    const isEXcludeFilterType =
                        +furtherFiltrationOption === PIN_SELECTOR ||
                        +furtherFiltrationOption === ZONES ||
                        +furtherFiltrationOption === INDIVIDUAL_PINS;

                    const { pinIDs } = filters;
                    const excluded =
                        (isEXcludeFilterType && !pinIDs.length) || !pinIDs.includes(pin.id);

                    return {
                        ...pin,
                        excluded,
                    };
                });
        };

        _getDateTimeFilters = () => {
            const {
                filters: { fromDateInclusive, toDateInclusive, includeTime, startTime, endTime },
                timeZone,
            } = this.props;

            let startDateTimeUTC = null;
            let endDateTimeUTC = null;

            if (includeTime && startTime && fromDateInclusive) {
                const [hour, minute] = startTime.split(':');

                startDateTimeUTC = moment
                    .tz(fromDateInclusive, timeZone.name)
                    .set({ hour, minute })
                    .utc()
                    .toISOString();
            } else if (fromDateInclusive) {
                startDateTimeUTC = moment
                    .tz(fromDateInclusive, timeZone.name)
                    .startOf('day')
                    .utc()
                    .toISOString();
            }

            if (includeTime && endTime && toDateInclusive) {
                const [hour, minute] = endTime.split(':');
                endDateTimeUTC = moment
                    .tz(toDateInclusive, timeZone.name)
                    .set({ hour, minute: parseInt(minute) + 1 })
                    .utc()
                    .toISOString();
            } else if (toDateInclusive) {
                // to date needs to be start of next day so that we get all pins from the previous day.
                endDateTimeUTC = moment
                    .tz(toDateInclusive, timeZone.name)
                    .add(1, 'days')
                    .startOf('day')
                    .utc()
                    .toISOString();
            }

            return [startDateTimeUTC, endDateTimeUTC];
        };

        _getHierarchyValues = () => {
            const {
                filters: { siteID, buildingID, floorID, drawingID, companyUserIDs },
            } = this.props;

            let hierarchyType;
            let hierarchyID;

            if (!isEmpty(siteID)) {
                hierarchyType = +HIERARCHY_IDS.SITE;
                hierarchyID = siteID;
            } else {
                if (!companyUserIDs.length) {
                    hierarchyType = HIERARCHY_IDS.ALL_SITES;
                }
            }
            if (!isEmpty(buildingID)) {
                hierarchyType = +HIERARCHY_IDS.BUILDING;
                hierarchyID = buildingID;
            }
            if (!isEmpty(floorID)) {
                hierarchyType = +HIERARCHY_IDS.FLOOR;
                hierarchyID = floorID;
            }
            if (!isEmpty(drawingID)) {
                hierarchyType = +HIERARCHY_IDS.DRAWING;
                hierarchyID = drawingID;
            } else {
                hierarchyType = +hierarchyType;
            }

            return { hierarchyType, hierarchyID };
        };

        _getPostBody = () => {
            const {
                filters: {
                    serviceID,
                    templateID,
                    status,
                    pinIDs = [],
                    reportHistories,
                    includePinLocation,
                    isPDFGeneration,
                    isCSVGeneration,
                    isFloorplanGeneration,
                    includeFloorplan,
                    isOAndMManualGeneration,
                    companyUserIDs,
                    floorplanPinScale,
                    createdByCompanyID,
                    zoneIDs,
                    zoneOpacity,
                    includeFloorplanZones,
                    includeTime,
                    isQuestionFilterExact,
                    includeCostingData,
                },
                furtherFiltrationOption,
                excludedPinIDs,
                rectangles,
                options: { showHidden, sortBy },
                fields,
                includedDrawingsIDs,
                customFilters,
            } = this.props;

            const { hierarchyType, hierarchyID } = this._getHierarchyValues();

            let questionFilters = null;
            let selectedPinIDs = null;

            const { INDIVIDUAL_PINS, ZONES, FILTERS, PIN_SELECTOR } = FURTHER_FILTRATION_OPTIONS;

            switch (+furtherFiltrationOption) {
                case PIN_SELECTOR:
                case ZONES:
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
                                exactMatch: isQuestionFilterExact,
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

            const pinBoundingBoxes = Object.values(rectangles).map(
                ({ corners: [first, second] }) => [getLatLng(first), getLatLng(second)],
            );
            // get the utc converted time for both from date and to date.

            const [startDate, endDate] = this._getDateTimeFilters();

            const serviceIDs = serviceID
                ? [+serviceID]
                : customFilters.services.map(({ id }) => id);

            const body = {
                hierarchyType,
                hierarchyID,
                reportHistories: reportHistories || null,
                includePinLocation,
                isPDFGeneration,
                isCSVGeneration,
                isFloorplanGeneration,
                includeFloorplan,
                isOAndMManualGeneration,
                fromDateInclusive: startDate,
                toDateInclusive: endDate,
                companyUserIDs,
                serviceID: serviceIDs,
                templateID: templateID || null,
                status: status ? status.map(item => +item) : null,
                pinIDs: selectedPinIDs,
                excludedPinIDs: Object.values(excludedPinIDs),
                questionFilters: questionFilters,
                showHidden,
                sortBy: +sortBy,
                pinBoundingBoxes,
                floorplanPinScale,
                hasQuestions: +furtherFiltrationOption > +INDIVIDUAL_PINS,
                includedDrawingIDs: includedDrawingsIDs,
                createdByCompanyID,
                zoneIDs,
                zoneOpacity,
                includeFloorplanZones,
                includeTime,
                isQuestionFilterExact,
                includeCostingData,
            };
            return body;
        };

        postFilters = async () => {
            const {
                postCustomFilters,
                getOperativeOptions,
                getTemplateOptions,
                getServiceOptions,
                getCompanyOptions,
            } = this.props;
            const body = this._getPostBody();

            if (body.hasQuestions) {
                return postCustomFilters(body);
            }

            await getOperativeOptions(body);
            await getTemplateOptions(body);
            await getServiceOptions(body);
            await getCompanyOptions(body);
        };

        getTemplateOptions = () => {
            const { getTemplateOptions } = this.props;
            const body = this._getPostBody();
            getTemplateOptions(body);
        };
    }

    const mapStateToProps = (
        {
            shared: {
                decodeJWTReducer: {
                    jwtData: { companyID },
                },
                fieldErrorsReducer: { fieldErrors, errorsVisible },
            },
            companyAdmin: {
                servicesReducer: { historicServices },
                sitesReducer: { sites },
                buildingsReducer,
                floorsReducer,
                drawingsReducer,
                companyUsersReducer: { users: companyUsers },
                reportsReducer: {
                    filters,
                    fields,
                    options,
                    postSuccess,
                    error,
                    customFilters,
                    rectangles,
                    excludedPinIDs,
                    furtherFiltrationOption,
                    includedDrawingsIDs,
                },
                operativesReducer: {
                    operativeOptions: operatives,
                    isFetching: isFetchingOperatives,
                },
                companySettingsReducer: {
                    companySettings: { timeZone },
                },
                zonesReducer: { zones },
            },
        },
        { blockName },
    ) => {
        const buildingsFromReducer = buildingsReducer.buildings;
        const floorsFromReducer = floorsReducer.floors;
        const drawingsFromReducer = drawingsReducer.drawings;

        let buildingIDs = [];
        if (!isEmpty(sites)) {
            filters.siteID.forEach(site => {
                const curSite = sites[site];
                if (curSite) {
                    buildingIDs = buildingIDs.concat(curSite.buildingIDs);
                }
            });
        }
        const buildings = !isEmpty(buildingsFromReducer)
            ? buildingIDs.map(id => buildingsFromReducer[id]).filter(x => !!x)
            : [];

        let floorIDs = [];
        if (!isEmpty(buildings)) {
            filters.buildingID.forEach(building => {
                const curBuilding = convertArrToObj(buildings)[building];
                if (curBuilding) {
                    floorIDs = floorIDs.concat(curBuilding.floorIDs);
                }
            });
        }
        const floors = !isEmpty(floorsFromReducer)
            ? floorIDs.map(id => floorsFromReducer[id]).filter(x => !!x)
            : [];

        let drawingIDs = [];
        if (!isEmpty(floors)) {
            filters.floorID.forEach(floor => {
                const curFloor = convertArrToObj(floors)[floor];
                if (curFloor) {
                    drawingIDs = drawingIDs.concat(curFloor.drawingIDs);
                }
            });
        }
        const drawings = !isEmpty(drawingsFromReducer)
            ? drawingIDs.map(id => drawingsFromReducer[id]).filter(x => !!x)
            : [];

        return {
            fieldErrors,
            fieldError: fieldErrors[blockName],
            errorsVisible,
            filters,
            rectangles,
            customFilters,
            options,
            postSuccess,
            error,
            operatives,
            companyUsers,
            services: Object.values(historicServices),
            sites: Object.values(sites),
            sitesObj: sites,
            buildings,
            floors,
            drawings,
            fields: Object.values(fields),
            excludedPinIDs,
            furtherFiltrationOption,
            timeZone,
            includedDrawingsIDs,
            zonesObj: zones,
            companyID,
            isFetchingOperatives,
        };
    };

    const mapDispatchToProps = dispatch => ({
        handleChange: (name, val) => dispatch(updateReportFilter(name, val)),
        postCustomFilters: postBody => dispatch(postCustomFilters(postBody)),
        addFieldError: (name, val) => dispatch(addFieldError(name, val)),
        removeFieldError: name => dispatch(removeFieldError(name)),
        showFieldErrors: () => dispatch(showFieldErrors()),
        getOperativeOptions: postBody => dispatch(getOperativeOptions(postBody)),
        getTemplateOptions: postBody => dispatch(getTemplateReportOptions(postBody)),
        getServiceOptions: postBody => dispatch(getServiceReportOptions(postBody)),
        getCompanyOptions: postBody => dispatch(getCompanyReportOptions(postBody)),
    });

    return connect(mapStateToProps, mapDispatchToProps)(WithUpdateOnChange);
}
