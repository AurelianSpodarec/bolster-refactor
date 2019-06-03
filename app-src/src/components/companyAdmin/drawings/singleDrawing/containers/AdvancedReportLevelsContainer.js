import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { convertArrToObj, isObjEmpty } from 'helpers/generic';

import AdvancedReportLevels from '../presentational/AdvancedReportLevels';
import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';
import withUpdateOnChange from 'components/companyAdmin/reports/createReport/components/hocs/withUpdateOnChange';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';

class AdvancedReportLevelsContainer extends Component {
    state = { fetched: false };

    render() {
        const {
            sites,
            buildings,
            floors,
            drawings,
            match: { params }
        } = this.props;

        const sitesOptions = this._formatArrForDropdown(sites);
        const buildingOptions = this._formatArrForDropdown(buildings);
        const floorOptions = this._formatArrForDropdown(floors);
        const drawingOptions = this._formatArrForDropdown(drawings);
        const selectedDrawing = drawings[params.id] || {};
        const selectedFloor = floors[selectedDrawing.floorID] || {};
        const selectedBuilding = buildings[selectedFloor.buildingID] || {};
        const selectedSite = sites[selectedBuilding.siteID] || {};

        return (
            <AdvancedReportLevels
                handleChange={this.handleChange}
                siteOptions={Object.values(sitesOptions)}
                selectedSite={sitesOptions[selectedSite.id]}
                buildingOptions={Object.values(buildingOptions)}
                selectedBuilding={buildingOptions[selectedBuilding.id]}
                floorOptions={Object.values(floorOptions)}
                selectedFloor={floorOptions[selectedFloor.id]}
                drawingOptions={Object.values(drawingOptions)}
                selectedDrawing={drawingOptions[selectedDrawing.id]}
            />
        );
    }

    componentDidMount = () => {
        const {
            drawing,
            fetchSingleFloor,
            floors,
            buildings,
            sites,
            pins,
            handleChange
        } = this.props;
        if (drawing.id) {
            this.handleChange('drawingID', drawing.id);
        }
        if (floors[drawing.floorID]) {
            const floor = floors[drawing.floorID];
            if (buildings[floor.buildingID]) {
                const building = buildings[floor.buildingID];
                if (sites[building.siteID]) {
                    const site = sites[building.siteID];
                    this.setState({ fetched: true });
                    handleChange('floorID', floor.id);
                    handleChange('buildingID', building.id);
                    handleChange('siteID', site.id);
                }
            }
        }
        fetchSingleFloor(drawing.floorID);
        if (pins && pins.length && drawing.id) {
            handleChange('pinIDs', pins.map(({ id }) => id));
        }
    };

    componentDidUpdate = (prevProps, prevState) => {
        const {
            drawing,
            floors,
            buildings,
            sites,
            fetchSingleBuilding,
            fetchSingleSite,
            handleChange,
            pins
        } = this.props;
        if (drawing.id && !prevProps.drawing.id) {
            updateReportFilter('drawingID', drawing.id);
            this.handleChange('drawingID', drawing.id);
        }
        const floor = floors[drawing.floorID] || {};
        if (!isObjEmpty(floor) && !prevProps.floors[drawing.floorID]) {
            fetchSingleBuilding(floor.buildingID);
        }
        const building = buildings[floor.buildingID] || {};
        if (!isObjEmpty(building) && !prevProps.buildings[floor.buildingID]) {
            fetchSingleSite(building.siteID).then(() =>
                this.setState({ fetched: true })
            );
        }
        const site = sites[building.siteID] || {};
        if (!isObjEmpty(site) && !prevProps.sites[building.siteID]) {
            this.setState({ fetched: true });
        }
        if (this.state.fetched && !prevState.fetched) {
            handleChange('floorID', floor.id);
            handleChange('buildingID', building.id);
            handleChange('siteID', site.id);
        }
        if (
            pins &&
            pins.length &&
            (!prevProps.pins || !prevProps.pins.length) &&
            drawing.id
        ) {
            handleChange('pinIDs', pins.map(({ id }) => id));
        }
    };

    updateDrawing = async (value = null) => {
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
        const options = Object.values(arr).map(({ name, id }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer: { sites },
            buildingsReducer: { buildings },
            floorsReducer: { floors },
            drawingsReducer: { drawings },
            reportsReducer: {
                customFilters: { pins }
            }
        }
    },
    { match: { params } }
) => {
    return {
        drawing: drawings[params.id] || {},
        drawings,
        floors,
        buildings,
        sites,
        pins
    };
};
const mapDispatchToProps = {
    fetchSingleBuilding,
    fetchSingleFloor,
    fetchSingleSite,
    updateReportFilter
};

export default withUpdateOnChange(
    withRouter(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(AdvancedReportLevelsContainer)
    )
);
