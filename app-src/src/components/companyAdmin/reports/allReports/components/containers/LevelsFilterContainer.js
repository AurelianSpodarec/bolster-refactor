import React, { Component } from 'react';

import withUpdateOnChange from '../hocs/withUpdateOnChange';

import LevelsSitesFilters from '../presentational/LevelsSitesFilters';
import { convertArrToObj } from 'helpers/generic';

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
            <div className="levels-filter size-lg-12">
                <div className="generic-form">
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
                            !!selectedFloor && !!selectedBuilding
                                ? 'active'
                                : ''
                        }
                        drawingOptions={Object.values(drawingOptions)}
                        handleChange={this.handleChange}
                        selectedDrawing={selectedDrawing}
                    />
                </div>
            </div>
        );
    }

    handleChange = ({ target: { value: hierarchyID, name } }) => {
        const { handleChange, postFilters } = this.props;

        return handleChange(name, hierarchyID).then(() =>
            handleChange('hierarchyID', hierarchyID).then(
                () => !(name === 'siteID' && !hierarchyID) && postFilters()
            )
        );
    };

    _formatArrForDropdown = arr => {
        const options = arr.map(({ name, id }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };
}

export default withUpdateOnChange(LevelsFilterContainer);
