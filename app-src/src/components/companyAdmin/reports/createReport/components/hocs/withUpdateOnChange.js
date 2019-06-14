import React from 'react';
import { connect } from 'react-redux';

import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { convertArrToObj } from 'helpers/generic';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';

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

        _getPostBody = () => {
            const {
                filters: {
                    siteID,
                    buildingID,
                    floorID,
                    drawingID,
                    serviceID,
                    status,
                    pinIDs,
                    reportHistories,
                    includePinLocation,
                    isPDFGeneration,
                    isCSVGeneration,
                    isFloorplanGeneration,
                    includeFloorplan,
                    fromDateInclusive,
                    toDateInclusive,
                    companyUserIDs
                },
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

            const questionFilters = fields.map(
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
                toDateInclusive,
                companyUserIDs,
                serviceID: serviceID || null,
                status: status || null,
                pinIDs: pinIDs || null,
                questionFilters,
                showHidden,
                sortBy
            };
            return body;
        };

        postFilters = () => {
            const { postCustomFilters } = this.props;

            return postCustomFilters(this._getPostBody());
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
                reportsReducer: {
                    filters,
                    fields,
                    options,
                    postSuccess,
                    error,
                    customFilters
                }
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
            customFilters,
            options,
            postSuccess,
            error,
            services: Object.values(servicesReducer.services),
            sites: Object.values(sitesReducer.sites),
            buildings,
            floors,
            drawings,
            fields: Object.values(fields)
        };
    };

    const mapDispatchToProps = dispatch => ({
        handleChange: (name, val) => dispatch(updateReportFilter(name, val)),
        postCustomFilters: postBody => dispatch(postCustomFilters(postBody)),
        addFieldError: (name, val) => dispatch(addFieldError(name, val)),
        removeFieldError: name => dispatch(removeFieldError(name)),
        showFieldErrors: () => dispatch(showFieldErrors())
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithUpdateOnChange);
}
