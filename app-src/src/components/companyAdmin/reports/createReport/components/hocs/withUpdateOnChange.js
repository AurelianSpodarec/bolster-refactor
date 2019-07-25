import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { convertArrToObj, momentComparisonFormat } from 'helpers/generic';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import { FURTHER_FILTRATION_OPTIONS } from 'constants/companyAdmin/enums';
import getOperativeOptions from 'actions/companyAdmin/reports/async/getOperativeOptions';
import getTemplateReportOptions from 'actions/companyAdmin/reports/async/getTemplateReportOptions';

export default function(ProtectedComponent) {
    class WithUpdateOnChange extends React.Component {
        state = {
            showError: false
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
                    validate={this.validate}
                    showFieldError={this.showFieldError}
                    getPostBody={this._getPostBody}
                    getFilteredPins={this._getFilteredPins}
                    getTemplateOptions={this.getTemplateOptions}
                />
            );
        }

        formatArrForDropdown = (arr, asObj) => {
            const options = arr.map(({ id, name }) => ({
                value: id,
                label: name,
                text: name
            }));

            return asObj ? convertArrToObj(options, 'value') : options;
        };

        validate = errorMessage => {
            const {
                addFieldError,
                removeFieldError,
                blockName,
                fieldError
            } = this.props;

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
            const { PIN_SELECTOR } = FURTHER_FILTRATION_OPTIONS;

            // ? Displays all pins if in rectangle mode, and only the selected pins otherwise.

            if (+furtherFiltrationOption > PIN_SELECTOR) {
                // advanced
                return pins.filter(({ id }) => filters.pinIDs.includes(id));
            }

            const {
                fromDateInclusive,
                toDateInclusive,
                status,
                serviceID,
                templateID,
                companyUserIDs
            } = filters;

            const NO = false;
            const YES = true;
            // simple
            return pins
                .filter(pin => {
                    // start date
                    if (
                        fromDateInclusive &&
                        moment(pin.createdOn) <
                            moment(fromDateInclusive, momentComparisonFormat)
                    ) {
                        return NO;
                    }
                    // end date
                    if (
                        toDateInclusive &&
                        moment(pin.createdOn) >
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
                        !companyUserIDs.includes(
                            pin.latestCreatedByCompanyUserID
                        )
                    ) {
                        return NO;
                    }
                    if (
                        +furtherFiltrationOption ===
                        FURTHER_FILTRATION_OPTIONS.INDIVIDUAL_PINS
                    ) {
                        if (!filters.pinIDs.includes(pin.id)) {
                            return NO;
                        }
                    }
                    return YES;
                })
                .map(pin => ({
                    ...pin,
                    excluded:
                        +furtherFiltrationOption === PIN_SELECTOR &&
                        !filters.pinIDs.includes(pin.id)
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
                    pinIDs = [],
                    reportHistories,
                    includePinLocation,
                    isPDFGeneration,
                    isCSVGeneration,
                    isFloorplanGeneration,
                    includeFloorplan,
                    fromDateInclusive,
                    toDateInclusive,
                    companyUserIDs,
                    floorplanPinScale
                },
                furtherFiltrationOption,
                excludedPinIDs,
                rectangles,
                options: { showHidden, sortBy },
                fields
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

            const { INDIVIDUAL_PINS, FILTERS } = FURTHER_FILTRATION_OPTIONS;

            switch (+furtherFiltrationOption) {
                case INDIVIDUAL_PINS: {
                    selectedPinIDs = pinIDs.filter(
                        id => !Object.values(excludedPinIDs).includes(id)
                    );
                    break;
                }
                case FILTERS: {
                    questionFilters = fields.map(
                        ({
                            selectedQuestions,
                            questionValues = [],
                            selectedValues = []
                        }) => {
                            let values = questionValues.length
                                ? questionValues
                                : selectedValues;

                            return {
                                questionGroupKeys: selectedQuestions,
                                values
                            };
                        }
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
                ({ corners: [first, second] }) => [
                    getLatLng(first),
                    getLatLng(second)
                ]
            );

            const endDate = toDateInclusive
                ? moment(toDateInclusive)
                      .endOf('day')
                      .toDate()
                : null;

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
                serviceID: serviceID || null,
                templateID: templateID || null,
                status: status || null,
                pinIDs: selectedPinIDs,
                questionFilters: questionFilters,
                showHidden,
                sortBy,
                pinBoundingBoxes,
                floorplanPinScale,
                hasQuestions: +furtherFiltrationOption > +INDIVIDUAL_PINS
            };
            return body;
        };

        getTemplateOptions = () => {
            return this.props.getTemplateOptions(this._getPostBody());
        };

        getOperativeOptions = () => {
            return this.props.getOperativeOptions(this._getPostBody());
        };

        postFilters = async () => {
            const {
                postCustomFilters,
                getOperativeOptions,
                getTemplateOptions
            } = this.props;
            const body = this._getPostBody();

            if (body.hasQuestions) {
                return postCustomFilters(body);
            }

            await getOperativeOptions(body);
            await getTemplateOptions(body);
        };
    }

    const mapStateToProps = (
        {
            shared: {
                fieldErrorsReducer: { fieldErrors, errorsVisible }
            },
            companyAdmin: {
                servicesReducer,
                sitesReducer,
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
                    furtherFiltrationOption
                },
                operativesReducer: { operatives }
            }
        },
        { blockName }
    ) => {
        const selectedSite = sitesReducer.sites[filters.siteID] || {};
        const buildingIDs = selectedSite.buildingIDs || [];
        const buildings = buildingIDs.map(id => buildingsReducer.buildings[id]);

        const selectedBuilding =
            buildingsReducer.buildings[filters.buildingID] || {};
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
            rectangles,
            customFilters,
            options,
            postSuccess,
            error,
            operatives,
            companyUsers,
            services: Object.values(servicesReducer.services),
            sites: Object.values(sitesReducer.sites),
            buildings,
            floors,
            drawings,
            fields: Object.values(fields),
            excludedPinIDs,
            furtherFiltrationOption
        };
    };

    const mapDispatchToProps = dispatch => ({
        handleChange: (name, val) => dispatch(updateReportFilter(name, val)),
        postCustomFilters: postBody => dispatch(postCustomFilters(postBody)),
        addFieldError: (name, val) => dispatch(addFieldError(name, val)),
        removeFieldError: name => dispatch(removeFieldError(name)),
        showFieldErrors: () => dispatch(showFieldErrors()),
        getOperativeOptions: postBody =>
            dispatch(getOperativeOptions(postBody)),
        getTemplateOptions: postBody =>
            dispatch(getTemplateReportOptions(postBody))
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithUpdateOnChange);
}
