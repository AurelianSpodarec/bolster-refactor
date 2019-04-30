import React, { Component } from 'react';

import { convertArrToObj } from 'helpers/generic';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import LevelFilters from '../presentational/LevelFilters';

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
        const buildingOptions = this._formatArrForDropdown(buildings);
        const floorOptions = this._formatArrForDropdown(floors);
        const drawingOptions = this._formatArrForDropdown(drawings);

        return (
            <LevelFilters
                handleChange={this.handleChange}
                siteOptions={Object.values(sitesOptions)}
                selectedSite={sitesOptions[siteID]}
                buildingOptions={Object.values(buildingOptions)}
                selectedBuilding={buildingOptions[buildingID]}
                floorOptions={Object.values(floorOptions)}
                selectedFloor={floorOptions[floorID]}
                drawingOptions={Object.values(drawingOptions)}
                selectedDrawing={drawingOptions[drawingID]}
            />
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
        return update(value).then(postFilters);
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
