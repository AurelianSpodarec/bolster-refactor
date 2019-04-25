import React from 'react';
import { connect } from 'react-redux';

import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';

export default function(ProtectedComponent) {
    class WithUpdateOnChange extends React.Component {
        render() {
            return (
                <ProtectedComponent
                    {...this.props}
                    postFilters={this.postFilters}
                    formatArrForDropdown={this.formatArrForDropdown}
                />
            );
        }

        formatArrForDropdown = arr => {
            return arr.map(({ id, name }) => ({
                value: id,
                label: name
            }));
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
            const hierarchyType = drawingID
                ? 'drawing'
                : floorID
                ? 'floor'
                : buildingID
                ? 'building'
                : 'site';
            const hierarchyID = drawingID
                ? drawingID
                : floorID
                ? floorID
                : buildingID
                ? buildingID
                : siteID;

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

    const mapStateToProps = ({
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
    }) => {
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
        postCustomFilters: postBody => dispatch(postCustomFilters(postBody))
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithUpdateOnChange);
}
