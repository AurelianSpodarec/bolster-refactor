import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { convertArrToObj } from 'helpers/generic';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import LevelFilters from '../presentational/LevelFilters';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';
import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';

class LevelsFilterContainer extends Component {
    render() {
        const {
            filters: { siteID, buildingID, floorID, drawingID },
            sites,
            buildings,
            floors,
            drawings,
            hierarchy
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
                hierarchy={hierarchy}
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

    handleChange = (name, value) => {
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
        const options = arr
            .filter(val => val)
            .map(({ name, id }) => ({
                value: id,
                text: name
            }));

        return convertArrToObj(options, 'value');
    };

    componentDidMount = () => {
        const {
            customFilters: { pins = [] },
            handleChange,
            hierarchy,
            hierarchyID
        } = this.props;

        // prefill on hierarchy single page advanced reports
        if (hierarchy === HIERARCHY_IDS.SITE) {
            this.handleChange('siteID', hierarchyID);
            this.handlePrefillSite(hierarchyID);
        } else if (hierarchy === HIERARCHY_IDS.BUILDING) {
            this.handleChange('buildingID', hierarchyID);
            this.handlePrefillBuilding(hierarchyID);
        } else if (hierarchy === HIERARCHY_IDS.FLOOR) {
            this.handleChange('floorID', hierarchyID);
            this.handlePrefillFloor(hierarchyID);
        } else if (hierarchy === HIERARCHY_IDS.DRAWING) {
            this.handleChange('drawingID', hierarchyID);
            this.handlePrefillDrawing(hierarchyID);
        }

        if (pins.length) handleChange('pinIDs', pins.map(({ id }) => id));
    };

    componentDidUpdate = ({ customFilters: { pins: prevPins = [] } }) => {
        const {
            customFilters: { pins = [] },
            handleChange
        } = this.props;
        if (pins.length !== prevPins.length) {
            handleChange('pinIDs', pins.map(({ id }) => id));
        }
    };

    // for advanced reports on hierarchy single pages vvvvvv

    handlePrefillSite = siteID => {
        const { handleChange } = this.props;
        handleChange('siteID', siteID);
        fetchSingleSite(siteID);
    };
    handlePrefillBuilding = buildingID => {
        const { handleChange, fetchSingleBuilding } = this.props;
        handleChange('buildingID', buildingID);
        fetchSingleBuilding(buildingID).then(({ payload: { siteID } }) =>
            this.handlePrefillSite(siteID)
        );
    };
    handlePrefillFloor = floorID => {
        const { handleChange, fetchSingleFloor } = this.props;
        handleChange('floorID', floorID);
        fetchSingleFloor(floorID).then(({ payload: { buildingID } }) =>
            this.handlePrefillBuilding(buildingID)
        );
    };
    handlePrefillDrawing = drawingID => {
        const { handleChange, fetchSingleDrawing } = this.props;
        handleChange('drawingID', drawingID);
        fetchSingleDrawing(drawingID).then(({ payload: { floorID } }) =>
            this.handlePrefillFloor(floorID)
        );
    };
}

const mapStateToProps = (_, { match: { params, path } }) => {
    const hierarchy = path.includes('drawing')
        ? HIERARCHY_IDS.DRAWING
        : path.includes('floor')
        ? HIERARCHY_IDS.FLOOR
        : path.includes('building')
        ? HIERARCHY_IDS.BUILDING
        : path.includes('site')
        ? HIERARCHY_IDS.SITE
        : '';
    const hierarchyID = params.id;
    return { hierarchy, hierarchyID };
};

const mapDispatchToProps = {
    fetchSingleDrawing,
    fetchSingleFloor,
    fetchSingleBuilding,
    fetchSingleSite
};

export default withUpdateOnChange(
    withRouter(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(LevelsFilterContainer)
    )
);
