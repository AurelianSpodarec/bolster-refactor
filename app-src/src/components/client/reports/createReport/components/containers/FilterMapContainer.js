import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import uuid from 'uuid/v4';

import updateReportFilter from 'actions/client/reports/create/sync/clientUpdateReportFilter';
import {
    RECTANGLE_MODES,
    FURTHER_FILTRATION_OPTIONS
} from 'constants/companyAdmin/enums';
import withUpdateOnChange from '../hocs/withUpdateOnChange';
import FilterMap from 'components/shared/maps/presentational/FilterMap';
import addRectangle from 'actions/client/reports/create/sync/clientAddRectangle';
import removeRectangle from 'actions/client/reports/create/sync/clientRemoveRectangle';
import removeAllRectangles from 'actions/client/reports/create/sync/clientRemoveAllRectangles';
import removeAllExcludedPins from 'actions/client/reports/create/sync/clientRemoveAllExcludedPins';
import fetchPins from 'actions/client/pins/async/clientFetchPins';
import updateFurtherFiltrationOption from 'actions/client/reports/create/sync/clientUpdateFurtherFiltrationOption';
import { momentComparisonFormat } from 'helpers/generic';
const { ADD, DELETE, EXCLUDE } = RECTANGLE_MODES;
const { PIN_SELECTOR } = FURTHER_FILTRATION_OPTIONS;

class FilterMapContainer extends Component {
    state = { mode: ADD, firstCorner: null };

    render() {
        const { drawing, rectangles, furtherFiltrationOption } = this.props;
        const { firstCorner, mode } = this.state;
        const cornerClicked = firstCorner;
        if (!drawing.id) return null;

        const shouldShowMapOptions = +furtherFiltrationOption === +PIN_SELECTOR;
        const isExcluding = +mode === EXCLUDE;

        return (
            <FilterMap
                drawing={drawing}
                pins={this.getFilteredPins()}
                handleClick={this.handleClick}
                cornerClicked={cornerClicked}
                rectangles={rectangles}
                setMode={this.setMode}
                handleDelete={this.handleDelete}
                handleCancelPinSelector={this.handleCancelPinSelector}
                shouldShowMapOptions={shouldShowMapOptions}
                mode={mode}
                isExcluding={isExcluding}
            />
        );
    }

    componentDidMount = () => {
        const {
            fetchPins,
            filters: { drawingID }
        } = this.props;
        const companyID = localStorage.getItem('selectedCompany');
        if (drawingID) fetchPins(companyID, drawingID);
    };

    componentDidUpdate = ({
        rectangles: prevRectangles,
        furtherFiltrationOption: prevOption,
        ...prevProps
    }) => {
        const {
            rectangles,
            postFilters,
            furtherFiltrationOption,
            removeAllRectangles,
            filters: { drawingID },
            fetchPins
        } = this.props;
        if (rectangles.length !== prevRectangles.length) {
            postFilters();
        }
        if (furtherFiltrationOption !== prevOption) {
            removeAllRectangles();
        }
        if (drawingID !== prevProps.filters.drawingID) {
            const companyID = localStorage.getItem('selectedCompany');
            fetchPins(companyID, drawingID);
        }
    };

    handleClick = ({ latlng }) => {
        const { firstCorner, mode } = this.state;
        const { lat, lng } = latlng;
        const { addRectangle, furtherFiltrationOption } = this.props;
        if (+furtherFiltrationOption === +PIN_SELECTOR && mode === ADD) {
            if (!firstCorner) {
                // draw first corner
                this.setState({ firstCorner: [lat, lng] });
            } else {
                // draw second corner
                const id = uuid();
                const secondCorner = [lat, lng];
                addRectangle(id, firstCorner, secondCorner);
                this.setState({ firstCorner: null });
            }
        }
    };

    setMode = mode => this.setState({ mode, firstCorner: null });

    handleDelete = id => {
        const { mode } = this.state;
        const { removeRectangle } = this.props;
        if (mode === DELETE) removeRectangle(id);
    };

    handleCancelPinSelector = () => {
        const {
            removeAllRectangles,
            removeAllExcludedPins,
            updateFurtherFiltrationOption
        } = this.props;
        updateFurtherFiltrationOption(FURTHER_FILTRATION_OPTIONS.NONE);
        removeAllExcludedPins();
        removeAllRectangles();
    };

    getFilteredPins = () => {
        const { pins, filters, furtherFiltrationOption } = this.props;

        // ? Displays all pins if in rectangle mode, and only the selected pins otherwise.
        if (+furtherFiltrationOption === +PIN_SELECTOR) {
            const {
                fromDateInclusive,
                toDateInclusive,
                status,
                serviceID
            } = filters;
            const filteredPins = pins.filter(pin => {
                if (
                    fromDateInclusive &&
                    moment(pin.createdOn) <
                        moment(fromDateInclusive, momentComparisonFormat)
                ) {
                    return false;
                }
                if (
                    toDateInclusive &&
                    moment(pin.createdOn) >
                        moment(toDateInclusive, momentComparisonFormat)
                ) {
                    return false;
                }
                if (status && +pin.latestStatus !== +status) {
                    return false;
                }
                if (serviceID && +pin.latestServiceID !== +serviceID) {
                    return false;
                }
                return true;
            });
            return filteredPins;
        }
        return pins.filter(({ id }) => filters.pinIDs.includes(id));
    };
}

const mapStateToProps = ({
    client: {
        reportsReducer: { filters, rectangles, furtherFiltrationOption },
        drawingsReducer: { drawings },
        pinsReducer: { pins }
    }
}) => ({
    drawing: drawings[filters.drawingID] || {},
    pins: Object.values(pins).filter(
        ({ drawingID }) => +drawingID === +filters.drawingID
    ),
    rectangles: Object.values(rectangles),
    furtherFiltrationOption
});

const mapDispatchToProps = {
    updateReportFilter,
    addRectangle,
    removeRectangle,
    removeAllExcludedPins,
    removeAllRectangles,
    fetchPins,
    updateFurtherFiltrationOption
};

export default withUpdateOnChange(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FilterMapContainer)
);
