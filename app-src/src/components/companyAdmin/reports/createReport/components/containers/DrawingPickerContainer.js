import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

import DrawingPicker from '../presentational/DrawingPicker';

import withUpdateOnChange from '../hocs/withUpdateOnChange';

const DrawingPickerContainer = ({ siteID, buildingID, floorID, drawings }) => {
    const [includedDrawings, setIncludeDrawing] = useState([]);
    const [excludedDrawings, setExcludeDrawing] = useState([]);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prevHierachyID = usePrevious({ siteID, buildingID, floorID });

    useEffect(() => {
        setExcludeDrawing(availableDrawings());
    }, [siteID, buildingID, floorID]);

    return (
        <DrawingPicker
            handleIncludeDrawing={handleIncludeDrawing}
            excludedDrawings={excludedDrawings}
            includedDrawings={includedDrawings}
            handleExcludeDrawing={handleExcludeDrawing}
        />
    );

    function availableDrawings(hierarchyID, hierarchyTypeID) {
        const allDrawings = Object.values(drawings);

        if (hierarchyTypeID === HIERARCHY_IDS.SITE) {
            return allDrawings.filter(drawing => drawing.siteID.toString() === hierarchyID);
        }
        if (hierarchyTypeID === HIERARCHY_IDS.BUILDING) {
            return allDrawings.filter(drawing => drawing.buildingID.toString() === hierarchyID);
        }
        if (hierarchyTypeID === HIERARCHY_IDS.FLOOR) {
            return allDrawings.filter(drawing => drawing.floorID.toString() === hierarchyID);
        }

        return [];
    }

    //get drawing and select the proper hierarchyID to get the correct floor.

    function handleIncludeDrawing(e, drawingID) {
        e.preventDefault();
        setIncludeDrawing(drawingID);
    }

    function handleExcludeDrawing(e, drawingID, hierarchyTypeID) {
        e.preventDefault();
        setExcludeDrawing(drawingID);
    }
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
