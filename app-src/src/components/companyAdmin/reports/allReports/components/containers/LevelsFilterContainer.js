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

    updateDrawing = (value = null) => {
        const { handleChange } = this.props;

        return handleChange('drawingID', value);
    };

    updateFloor = (value = null) => {
        const { handleChange } = this.props;

        return this.updateDrawing().then(() => handleChange('floorID', value));
    };

    updateBuilding = (value = null) => {
        const { handleChange } = this.props;

        return this.updateFloor().then(() => handleChange('buildingID', value));
    };

    updateSite = (value = null) => {
        const { handleChange } = this.props;

        return this.updateBuilding().then(() => handleChange('siteID', value));
    };

    handleChange = ({ target: { value, name } }) => {
        const { postFilters } = this.props;

        const updateMethods = {
            drawingID: this.updateDrawing,
            floorID: this.updateFloor,
            buildingID: this.updateBuilding,
            siteID: this.updateSite
        };
        const update = updateMethods[name];
        return update(value).then(
            () => !(name === 'siteID' && !value) && postFilters()
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
