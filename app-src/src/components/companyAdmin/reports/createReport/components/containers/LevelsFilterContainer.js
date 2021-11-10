import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import _ from 'lodash';

import { convertArrToObj, isObjEmpty } from 'helpers/generic';
import { CONFIRM_SUBMIT } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import LevelFilters from '../presentational/LevelFilters';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';
import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import fetchZonesForReportByDrawingID from 'actions/companyAdmin/zones/async/fetchZonesForReportByDrawingID';
class LevelsFilterContainer extends Component {
    render() {
        const {
            filters: { siteID, buildingID, floorID, drawingID },
            sites,
            buildings,
            floors,
            drawings,
            hierarchy,
            isFetching,
            formatArrForDropdown,
        } = this.props;

        const sortedFloors = Object.values(floors).sort((a, b) => a.sort - b.sort); // Sort based on sort key

        const sitesOptions = formatArrForDropdown(sites);
        const buildingOptions = formatArrForDropdown(buildings);
        const floorOptions = formatArrForDropdown(sortedFloors);
        const drawingOptions = formatArrForDropdown(drawings);

        return (
            <LevelFilters
                handleChange={this.handleChange}
                siteOptions={Object.values(sitesOptions)}
                selectedSite={siteID}
                buildingOptions={Object.values(buildingOptions)}
                selectedBuilding={buildingID}
                floorOptions={floorOptions}
                selectedFloor={floorID}
                drawingOptions={Object.values(drawingOptions)}
                selectedDrawing={drawingID}
                hierarchy={hierarchy}
                isFetching={isFetching}
            />
        );
    }

    updateDrawing = (value = []) => {
        const { handleChange } = this.props;

        return handleChange('drawingID', value);
    };

    updateFloor = (value = []) => {
        const {
            handleChange,
            filters: { drawingID },
            drawings,
        } = this.props;
        let updatedDrawingIDs = [];

        if (drawingID) {
            updatedDrawingIDs = this.getUpdatedIDs(value, drawingID, drawings, 'floorID');
        }

        return this.updateDrawing(updatedDrawingIDs).then(() => handleChange('floorID', value));
    };

    updateBuilding = (value = []) => {
        const {
            handleChange,
            filters: { floorID },
            floors,
        } = this.props;
        let updatedFloorIDs = [];

        if (floorID.length) {
            updatedFloorIDs = this.getUpdatedIDs(value, floorID, floors, 'buildingID');
        }

        return this.updateFloor(updatedFloorIDs).then(() => handleChange('buildingID', value));
    };

    updateSite = (value = []) => {
        const {
            handleChange,
            filters: { buildingID },
            buildings,
        } = this.props;
        let updatedBuildingIDs = [];

        if (buildingID.length) {
            updatedBuildingIDs = this.getUpdatedIDs(value, buildingID, buildings, 'siteID');
        }

        return this.updateBuilding(updatedBuildingIDs).then(() => handleChange('siteID', value));
    };

    getUpdatedIDs = (value, unfilteredIDs, hierarchyArray, keyToCheck) => {
        const convertedHierarchyObj = convertArrToObj(hierarchyArray);

        const filteredFloors = unfilteredIDs.reduce((acc, id) => {
            acc.push(convertedHierarchyObj[id]);

            return acc;
        }, []);

        const updatedFloorIDs = filteredFloors.reduce((acc, floor) => {
            value.forEach(id => {
                if (+id === +floor[keyToCheck]) acc.push(floor.id);
            });

            return acc;
        }, []);

        return updatedFloorIDs;
    };

    handleChange = (name, value, mount = false, shouldPostFilters = true) => {
        const { postFilters, shouldConfirm, showModal, hideModal } = this.props;
        const updateMethods = {
            drawingID: this.updateDrawing,
            floorID: this.updateFloor,
            buildingID: this.updateBuilding,
            siteID: this.updateSite,
        };
        const update = updateMethods[name];
        const postFiltersIfNeeded = () => shouldPostFilters && postFilters();

        if (shouldConfirm && !mount) {
            const handleSubmit = () => {
                hideModal();
                return update(value).then(postFiltersIfNeeded);
            };
            const message = 'Changing this will reset your advanced filters options, continue?';
            // * confirm and then do this:
            showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
        } else {
            return update(value).then(postFiltersIfNeeded);
        }
    };

    componentDidMount = () => {
        const {
            customFilters: { pins = [] },
            handleChange,
            hierarchy,
            hierarchyID,
            location: { state: locationState },
        } = this.props;

        // prefill on hierarchy single page advanced reports
        if (hierarchy === HIERARCHY_IDS.SITE) {
            this.handleChange('siteID', [+hierarchyID], true);
            this.handlePrefillSite(hierarchyID);
        } else if (hierarchy === HIERARCHY_IDS.BUILDING) {
            this.handleChange('buildingID', [+hierarchyID], true);
            this.handlePrefillBuilding(hierarchyID);
        } else if (hierarchy === HIERARCHY_IDS.FLOOR) {
            this.handleChange('floorID', [+hierarchyID], true);
            this.handlePrefillFloor(hierarchyID);
        } else if (hierarchy === HIERARCHY_IDS.DRAWING) {
            this.handleChange('drawingID', [+hierarchyID], true);
            this.handlePrefillDrawing(hierarchyID);
        }

        if (pins.length)
            handleChange(
                'pinIDs',
                pins.map(({ id }) => id),
            );

        if (locationState && locationState.drawingID) {
            const { siteID, buildingID, floorID, drawingID } = locationState;

            this.handleChange('siteID', [+siteID], true, false);
            this.handleChange('buildingID', [+buildingID], true, false);
            this.handleChange('floorID', [+floorID], true, false);
            this.handleChange('drawingID', [+drawingID], true);

            this.handlePrefillSite(siteID);
            this.handlePrefillBuilding(buildingID);
            this.handlePrefillFloor(floorID);
            this.handlePrefillDrawing(drawingID);
        }
    };

    componentDidUpdate = ({
        customFilters: { pins: prevPins = [] },
        filters: {
            siteID: prevSiteID,
            companyUserIDs: prevCompanyUserIDs = [],
            drawingID: prevDrawingID,
        },
    }) => {
        const {
            customFilters: { pins = [] },
            filters: { siteID, companyUserIDs = [], drawingID },
            handleChange,
            updateReportFilter,
            postFilters,
            removeFieldError,
            fetchZonesForReportByDrawingID,
        } = this.props;
        if (pins.length !== prevPins.length) {
            handleChange(
                'pinIDs',
                pins.map(({ id }) => id),
            );
        }
        if (siteID !== prevSiteID || companyUserIDs !== prevCompanyUserIDs) {
            let value = null;

            if (!siteID && !companyUserIDs.length) {
                value = HIERARCHY_IDS.ALL_SITES;
                this.validateDates();
            } else {
                removeFieldError('fromDateInclusive');
            }

            this.setState({
                initialLoad: false,
            });

            updateReportFilter('hierarchyType', value).then(postFilters);
        }

        if (!_.isEqual(drawingID, prevDrawingID)) {
            if (drawingID.length > prevDrawingID.length) {
                const diffID = drawingID.filter(id => !prevDrawingID.includes(id))[0];
                fetchZonesForReportByDrawingID(diffID);
            }
        }
    };

    // for advanced reports on hierarchy single pages

    handlePrefillSite = siteID => {
        const { handleChange } = this.props;
        handleChange('siteID', [+siteID]);
        fetchSingleSite(siteID);
    };
    handlePrefillBuilding = buildingID => {
        const { handleChange, fetchSingleBuilding } = this.props;
        handleChange('buildingID', [+buildingID]);
        fetchSingleBuilding(buildingID).then(({ payload: { siteID } }) =>
            this.handlePrefillSite(siteID),
        );
    };
    handlePrefillFloor = floorID => {
        const { handleChange, fetchSingleFloor } = this.props;
        handleChange('floorID', [+floorID]);
        fetchSingleFloor(floorID).then(({ payload: { buildingID } }) =>
            this.handlePrefillBuilding(buildingID),
        );
    };
    handlePrefillDrawing = drawingID => {
        const { handleChange, fetchSingleDrawing } = this.props;
        if (drawingID) {
            handleChange('drawingID', [+drawingID]);
            fetchSingleDrawing(drawingID).then(({ payload: { floorID } }) =>
                this.handlePrefillFloor(floorID),
            );
        }
    };

    validateDates = () => {
        const {
            filters: { fromDateInclusive, toDateInclusive },
            addFieldError,
            removeFieldError,
        } = this.props;

        if (fromDateInclusive) {
            const toDate = toDateInclusive || moment(new Date().setHours(0, 0, 0, 0));

            const diff = moment(toDate).diff(fromDateInclusive, 'days');

            if (diff >= 7) {
                return addFieldError(
                    'fromDateInclusive',
                    'You must select a date range of 7 days or less.',
                );
            }

            return removeFieldError('fromDateInclusive');
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer,
            buildingsReducer,
            floorsReducer,
            drawingsReducer,
            reportsReducer: {
                fields,
                filters: { pinIDs = [] },
                customFilters: { pins = [] },
            },
        },
    },
    { match: { params, path } },
) => {
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
    return {
        hierarchy,
        hierarchyID,
        isFetching:
            sitesReducer.isFetching ||
            buildingsReducer.isFetching ||
            floorsReducer.isFetching ||
            drawingsReducer.isFetching,
        shouldConfirm: !isObjEmpty(fields) || pins.length !== pinIDs.length,
    };
};

const mapDispatchToProps = {
    fetchSingleDrawing,
    fetchSingleFloor,
    fetchSingleBuilding,
    fetchSingleSite,
    updateReportFilter,
    showModal,
    hideModal,
    removeFieldError,
    fetchZonesForReportByDrawingID,
};

export default withUpdateOnChange(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(LevelsFilterContainer)),
);
