import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';

import FilterMap from '../presentational/FilterMap';
import addRectangle from 'actions/companyAdmin/reports/sync/addRectangle';
import removeRectangle from 'actions/companyAdmin/reports/sync/removeRectangle';
import { RECTANGLE_MODES } from 'constants/companyAdmin/enums';
import withUpdateOnChange from '../hocs/withUpdateOnChange';
const { ADD, DELETE } = RECTANGLE_MODES;

class FilterMapContainer extends Component {
    state = {
        drawRectangleMode: true,
        mode: ADD,
        // firstCorner sets to [lat, lng]
        firstCorner: null,
        firstLat: null,
        firstLng: null
    };

    render() {
        const { drawing, pins, rectangles, removeRectangle } = this.props;
        const { firstCorner } = this.state;
        const cornerClicked = firstCorner;
        if (!drawing.id) return null;
        return (
            <FilterMap
                drawing={drawing}
                pins={pins}
                handleClick={this.handleClick}
                cornerClicked={cornerClicked}
                rectangles={rectangles}
                removeRectangle={removeRectangle}
                setMode={this.setMode}
                handleDelete={this.handleDelete}
            />
        );
    }

    componentDidUpdate = ({ rectangles: prevRectangles }) => {
        const { rectangles, postFilters } = this.props;
        if (rectangles.length !== prevRectangles.length) {
            postFilters();
        }
    };

    handleClick = ({ latlng }) => {
        const { drawRectangleMode, firstCorner, mode } = this.state;
        const { lat, lng } = latlng;
        const { addRectangle } = this.props;
        if (drawRectangleMode && mode === ADD) {
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

    getFilteredPins = () => {
        const { drawRectangleMode } = this.state;
        const {
            pins,
            filters: { pinIDs }
        } = this.props;

        // ? Displays all pins if in rectangle mode, and only the selected pins otherwise.
        if (drawRectangleMode) {
            return pins;
        }
        return pins.filter(({ id }) => pinIDs.includes(id));
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters, rectangles },
        drawingsReducer: { drawings },
        pinsReducer: { pins }
    }
}) => ({
    filters,
    drawing: drawings[filters.drawingID] || {},
    pins: Object.values(pins).filter(
        ({ drawingID }) => +drawingID === +filters.drawingID
    ),
    rectangles: Object.values(rectangles)
});

const mapDispatchToProps = {
    updateReportFilter,
    addRectangle,
    removeRectangle
};

export default withUpdateOnChange(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FilterMapContainer)
);
