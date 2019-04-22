import React, { Component } from 'react';
import { connect } from 'react-redux';

import LevelsSitesFilters from '../presentational/LevelsSitesFilters';
import { convertArrToObj } from 'helpers/generic';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';

import LevelsBuildingsFilters from '../presentational/LevelsBuildingsFilters';
import LevelsFloorsFilters from '../presentational/LevelsFloorsFilters';
import LevelsDrawingsFilters from '../presentational/LevelsDrawingsFilters';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

class LevelsFilterContainer extends Component {
    render() {
        const {
            filters: { siteID, buildingID, floorID, drawingID },
            sites,
            buildings,
            floors,
            drawings
        } = this.props;

        const sitesOptions = this._formatArrForDropdown(sites);
        const selectedSite = sitesOptions[siteID];
        const buildingOptions = this._formatArrForDropdown(buildings);
        const selectedBuilding = buildingOptions[buildingID];
        const floorOptions = this._formatArrForDropdown(floors);
        const selectedFloor = floorOptions[floorID];
        const drawingOptions = this._formatArrForDropdown(drawings);
        const selectedDrawing = drawingOptions[drawingID];

        return (
            <div className="levels-filter size-lg-12">
                <LevelsSitesFilters
                    classes="active"
                    sitesOptions={Object.values(sitesOptions)}
                    selectedSite={selectedSite}
                    handleChange={this.handleChange}
                />

                <LevelsBuildingsFilters
                    classes={selectedSite ? 'active' : ''}
                    buildingOptions={Object.values(buildingOptions)}
                    handleChange={this.handleChange}
                    selectedBuilding={selectedBuilding}
                />

                <LevelsFloorsFilters
                    classes={selectedBuilding ? 'active' : ''}
                    floorOptions={Object.values(floorOptions)}
                    handleChange={this.handleChange}
                    selectedFloor={selectedFloor}
                />

                <LevelsDrawingsFilters
                    classes={
                        !!selectedFloor && !!selectedBuilding ? 'active' : ''
                    }
                    drawingOptions={Object.values(drawingOptions)}
                    handleChange={this.handleChange}
                    selectedDrawing={selectedDrawing}
                />
            </div>
        );
    }

    handleChange = ({ target: { value, name } }) => {
        const {
            updateReportFilter,
            postCustomFilters,
            filters: { numberOfHistoriesID }
        } = this.props;

        updateReportFilter(name, value);

        name === 'siteID' &&
            postCustomFilters({
                hierarchyType: HIERARCHY_IDS.SITE,
                hierarchyID: value,
                ReportHistories: numberOfHistoriesID
            });

        name === 'buildingID' &&
            postCustomFilters({
                hierarchyType: HIERARCHY_IDS.BUILDING,
                hierarchyID: value,
                ReportHistories: numberOfHistoriesID
            });

        name === 'floorID' &&
            postCustomFilters({
                hierarchyType: HIERARCHY_IDS.FLOOR,
                hierarchyID: value,
                ReportHistories: numberOfHistoriesID
            });

        name === 'drawingID' &&
            postCustomFilters({
                hierarchyType: HIERARCHY_IDS.DRAWING,
                hierarchyID: value,
                ReportHistories: numberOfHistoriesID
            });

        updateReportFilter('hierarchyID', value);
    };

    _formatArrForDropdown = arr => {
        const options = arr.map(({ name, id }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        buildingsReducer,
        floorsReducer,
        drawingsReducer,
        reportsReducer: { filters }
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
        sites: Object.values(sitesReducer.sites),
        buildings,
        floors,
        drawings,
        filters
    };
};

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, val) => {
        dispatch(updateReportFilter(name, val));
    },
    postCustomFilters: postBody => {
        dispatch(postCustomFilters(postBody));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LevelsFilterContainer);
