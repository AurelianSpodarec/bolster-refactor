import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import clientUpdateReportFilter from 'actions/client/reports/create/sync/clientUpdateReportFilter';
import clientPostCustomFilters from 'actions/client/reports/create/async/clientPostCustomFilters';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { convertArrToObj, getSelectedCompanyForClient } from 'helpers/generic';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import { FURTHER_FILTRATION_OPTIONS } from 'constants/companyAdmin/enums';

export default function(ProtectedComponent) {
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
                        id => !Object.values(excludedPinIDs).includes(id)
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

            const pinBoundingBoxes = Object.values(
                rectangles
            ).map(({ corners: [first, second] }) => [getLatLng(first), getLatLng(second)]);

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
                excludedPinIDs,
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
            },
        },
        { blockName }
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
            excludedPinIDs: excludedPinIDs || [],
            furtherFiltrationOption,
            rectangles,
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
