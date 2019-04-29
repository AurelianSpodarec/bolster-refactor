import React from 'react';
import { connect } from 'react-redux';

import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

export default function(ProtectedComponent) {
    class WithUpdateOnChange extends React.Component {
        state = {
            showError: false
        };
        render() {
            const { showError } = this.state;
            const { fieldError, ...props } = this.props;

            return (
                <ProtectedComponent
                    {...props}
                    fieldError={showError ? fieldError : null}
                    postFilters={this.postFilters}
                    formatArrForDropdown={this.formatArrForDropdown}
                    validate={this.validate}
                    showFieldError={this.showFieldError}
                />
            );
        }

        formatArrForDropdown = arr => {
            return arr.map(({ id, name }) => ({
                value: id,
                label: name
            }));
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

        postFilters = () => {
            const {
                filters: {
                    siteID,
                    buildingID,
                    floorID,
                    drawingID,
                    serviceID,
                    statusID,
                    numberOfHistoriesID,
                    reportFormatID,
                    includeLocationDrawing,
                    startDate,
                    endDate,
                    operativeIDs
                },
                fields,
                options: { showHidden, layout, sortBy },
                postCustomFilters
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
                ({ selectedQuestions, questionValues }) => ({
                    questionGroupKeys: selectedQuestions,
                    values: Object.values(questionValues).map(
                        ({ value }) => value
                    )
                })
            );

            const postBody = {
                hierarchyType,
                hierarchyID,
                reportHistories: numberOfHistoriesID,
                fileType: reportFormatID,
                includePinLocation: includeLocationDrawing,
                fromDateInclusive: startDate,
                ToDateInclusive: endDate,
                companyUserIDs: operativeIDs,
                serviceID,
                status: statusID || null,
                questionFilters,
                showHidden,
                layout,
                sortBy
            };

            return postCustomFilters(postBody);
        };
    }

    const mapStateToProps = (
        {
            shared: {
                fieldErrorsReducer: { fieldErrors, errorsVisible }
            },
            companyAdmin: {
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
            fieldError: fieldErrors[blockName],
            errorsVisible,
            filters,
            customFilters,
            options,
            postSuccess,
            error,
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
        addFieldError: (name, val) => {
            dispatch(addFieldError(name, val));
        },
        removeFieldError: name => {
            dispatch(removeFieldError(name));
        }
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithUpdateOnChange);
}
