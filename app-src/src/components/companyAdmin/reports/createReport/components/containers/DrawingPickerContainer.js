import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DrawingPicker from '../presentational/DrawingPicker';

import withUpdateOnChange from '../hocs/withUpdateOnChange';

const DrawingPickerContainer = ({ siteID, buildingID, floorID, drawings }) => {
    function availableDrawings() {
        const allDrawings = Object.values(drawings);

        if (siteID) {
            return allDrawings.filter(drawing => drawing.siteID.toString() === siteID);
        }
        if (buildingID) {
            return allDrawings.filter(drawing => drawing.buildingID.toString() === buildingID);
        }
        if (floorID) {
            return allDrawings.filter(drawing => drawing.floorID.toString() === floorID);
        }

        return [];
    }

    return <DrawingPicker drawings={availableDrawings()} />;
};

//get each drawing for each level
const mapStateToProps = ({
    companyAdmin: {
        sitesReducer: { sites },
        drawingsReducer: { drawings },
        reportsReducer: {
            filters: { siteID, floorID, buildingID }
        }
    }
}) => ({
    siteID,
    sites,
    floorID,
    buildingID,
    drawings
});

export default withRouter(withUpdateOnChange(connect(mapStateToProps)(DrawingPickerContainer)));
