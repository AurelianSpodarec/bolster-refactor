import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

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

class LevelsFilterContainer extends Component {
    render() {
        const {
            filters: { siteID, buildingID, floorID, drawingID },
            sites,
            buildings,
            floors,
            drawings,
            hierarchy,
            isFetching
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
                isFetching={isFetching}
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

    handleChange = (name, value, mount = false) => {
        const { postFilters, shouldConfirm, showModal, hideModal } = this.props;
        const updateMethods = {
            drawingID: this.updateDrawing,
            floorID: this.updateFloor,
            buildingID: this.updateBuilding,
            siteID: this.updateSite
        };
        const update = updateMethods[name];

        if (shouldConfirm && !mount) {
            const handleSubmit = () => {
                hideModal();
                return update(value).then(postFilters);
            };
            const message = 'Changing this will reset your advanced filters options, continue?';
            // * confirm and then do this:
            showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
        } else {
            return update(value).then(postFilters);
        }
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
            hierarchyID,
            location: { state: locationState }
        } = this.props;

        // prefill on hierarchy single page advanced reports
        if (hierarchy === HIERARCHY_IDS.SITE) {
            this.handleChange('siteID', hierarchyID, true);
            this.handlePrefillSite(hierarchyID);
        } else if (hierarchy === HIERARCHY_IDS.BUILDING) {
            this.handleChange('buildingID', hierarchyID, true);
            this.handlePrefillBuilding(hierarchyID);
        } else if (hierarchy === HIERARCHY_IDS.FLOOR) {
            this.handleChange('floorID', hierarchyID, true);
            this.handlePrefillFloor(hierarchyID);
        } else if (hierarchy === HIERARCHY_IDS.DRAWING) {
            this.handleChange('drawingID', hierarchyID, true);
            this.handlePrefillDrawing(hierarchyID);
        }

        if (pins.length) handleChange('pinIDs', pins.map(({ id }) => id));

        if (locationState && locationState.drawingID) {
            const { siteID, buildingID, floorID, drawingID } = locationState;

            this.handleChange('siteID', siteID, true);
            this.handleChange('buildingID', buildingID, true);
            this.handleChange('floorID', floorID, true);
            this.handleChange('drawingID', drawingID, true);

            this.handlePrefillSite(siteID);
            this.handlePrefillBuilding(buildingID);
            this.handlePrefillFloor(floorID);
            this.handlePrefillDrawing(drawingID);
        }
    };

    componentDidUpdate = ({ customFilters: { pins: prevPins = [] }, filters: { siteID: prevSiteID, companyUserIDs: prevCompanyUserIDs = [] } }) => {
        const {
            customFilters: { pins = [] },
            filters: { siteID, companyUserIDs = [] },
            handleChange,
            updateReportFilter,
            postFilters,
            removeFieldError
        } = this.props;
        if (pins.length !== prevPins.length) {
            handleChange('pinIDs', pins.map(({ id }) => id));
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
    };

    // for advanced reports on hierarchy single pages

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

    validateDates = () => {
        const {
            filters: { fromDateInclusive, toDateInclusive },
            addFieldError,
            removeFieldError,
        } = this.props;

        if (fromDateInclusive && toDateInclusive) {
            const toDate = toDateInclusive || moment(new Date().setHours(0, 0, 0, 0));

            const diff = moment(toDate).diff(fromDateInclusive, 'days');

            if (diff >= 7) {
                return addFieldError('fromDateInclusive', 'You must select a date range of 7 days or less.');
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
                customFilters: { pins = [] }
            }
        }
    },
    { match: { params, path } }
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
        shouldConfirm: !isObjEmpty(fields) || pins.length !== pinIDs.length
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
    removeFieldError
};

export default withUpdateOnChange(
    withRouter(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(LevelsFilterContainer)
    )
);
