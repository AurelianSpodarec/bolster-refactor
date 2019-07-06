import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';

import addRectangle from 'actions/companyAdmin/reports/sync/addRectangle';
import removeRectangle from 'actions/companyAdmin/reports/sync/removeRectangle';
import {
    RECTANGLE_MODES,
    FURTHER_FILTRATION_OPTIONS
} from 'constants/companyAdmin/enums';
import withUpdateOnChange from '../hocs/withUpdateOnChange';
import removeAllRectangles from 'actions/companyAdmin/reports/sync/removeAllRectangles';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import { momentComparisonFormat } from 'helpers/generic';
import updateFurtherFiltrationOption from 'actions/companyAdmin/reports/sync/updateFurtherFiltrationOption';
import removeAllExcludedPins from 'actions/companyAdmin/reports/sync/removeAllExcludedPins';
import FilterMap from 'components/shared/maps/presentational/FilterMap';
const { ADD, DELETE, EXCLUDE } = RECTANGLE_MODES;
const { PIN_SELECTOR } = FURTHER_FILTRATION_OPTIONS;

class FilterMapContainer extends Component {
    state = {
        mode: ADD,
        firstCorner: null
    };

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
                pins={this.props.getFilteredPins(this.props.pins)}
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
        if (drawingID) fetchPins('drawing', drawingID);
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
            console.warn(drawingID);
            console.warn(prevProps.filters.drawingID);
            fetchPins('drawing', drawingID);
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

    setMode = mode => {
        this.setState({ mode, firstCorner: null });
    };

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
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters, rectangles, furtherFiltrationOption },
        drawingsReducer: { drawings },
        pinsReducer: { pins }
    }
}) => ({
    filters,
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
    removeAllRectangles,
    removeAllExcludedPins,
    fetchPins,
    updateFurtherFiltrationOption
};

export default withUpdateOnChange(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FilterMapContainer)
);
