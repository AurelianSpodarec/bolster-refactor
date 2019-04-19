import React, { Component } from 'react';
import { connect } from 'react-redux';

import LevelsSitesFilters from '../presentational/LevelsSitesFilters';
import { ACCESS_TYPES } from 'constants/companyAdmin/enums';
import { convertArrToObj } from 'helpers/generic';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import LevelsBuildingsFilters from '../presentational/LevelsBuildingsFilters';

class LevelsFilterContainer extends Component {
    render() {
        const {
            filters: { siteID, buildingID },
            sites,
            buildings
        } = this.props;

        const sitesOptions = this._formatArrForDropdown(sites);
        const selectedSite = sitesOptions[siteID];
        const buildingOptions = this._formatArrForDropdown(buildings);
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
                        selectedBuilding={buildingOptions[buildingID]}
                        handleBuildingChange={this.handleBuildingChange}
                    />
                )}
            </>
        );
    }

    handleChange = ({ target: { value, name } }) => {
        const { updateReportFilter } = this.props;

        console.log(value);
        console.log(value);
        console.log(value);

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

    return {
        sites: Object.values(sitesReducer.sites),
        buildings,
        floors: Object.values(floorsReducer.floors),
        drawings: Object.values(drawingsReducer),
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
