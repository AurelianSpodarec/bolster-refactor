import React, { Component } from 'react';
import { connect } from 'react-redux';

import LevelsSitesFilters from '../presentational/LevelsSitesFilters';
import { convertArrToObj } from 'helpers/generic';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import LevelsBuildingsFilters from '../presentational/LevelsBuildingsFilters';
import LevelsFloorsFilters from '../presentational/LevelsFloorsFilters';
import LevelsDrawingsFilters from '../presentational/LevelsDrawingsFilters';

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
            <>
                <LevelsSitesFilters
                    sitesOptions={Object.values(sitesOptions)}
                    selectedSite={selectedSite}
                    handleChange={this.handleChange}
                />

                {!!selectedSite && (
                    <LevelsBuildingsFilters
                        buildingOptions={Object.values(buildingOptions)}
                        handleChange={this.handleChange}
                        selectedBuilding={selectedBuilding}
                    />
                )}
                {!!selectedBuilding && (
                    <LevelsFloorsFilters
                        floorOptions={Object.values(floorOptions)}
                        handleChange={this.handleChange}
                        selectedFloor={selectedFloor}
                    />
                )}
                {!!selectedFloor && !!selectedBuilding && (
                    <LevelsDrawingsFilters
                        drawingOptions={Object.values(drawingOptions)}
                        handleChange={this.handleChange}
                        selectedDrawing={selectedDrawing}
                    />
                )}
            </>
        );
    }

    handleChange = ({ target: { value, name } }) => {
        const { updateReportFilter } = this.props;

        updateReportFilter(name, value);
    };

    _formatArrForDropdown = arr => {
        const options = arr.map(({ name, id }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };

    // _formatBuildings = () => {
    //     const {sites, buildings} = this.props;

    //     buildings.filter(({siteID}) => () );
    // };
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
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LevelsFilterContainer);
