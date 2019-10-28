import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

import DrawingPicker from '../presentational/DrawingPicker';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import updateDrawingIDsIncluded from 'actions/companyAdmin/reports/sync/updateDrawingIDsIncluded';

const DrawingPickerContainer = ({
    siteID,
    buildingID,
    floorID,
    drawingID,
    drawings,
    updateDrawingIDsIncluded
}) => {
    const [includedDrawings, setIncludeDrawings] = useState([]);
    const [excludedDrawings, setExcludeDrawings] = useState([]);
    const [selectedDrawings, setSelectedDrawings] = useState([]);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prevHierarchyID = usePrevious({ siteID, buildingID, floorID });

    useEffect(() => {
        //check which hierarchy has changed and set availableDrawings with the correct hierarchy ID and type
        if (siteID) {
            if (siteID && prevHierarchyID.siteID != siteID.toString()) {
                setExcludeDrawings(availableDrawings(siteID, HIERARCHY_IDS.SITE));
                setIncludeDrawings([]);
            } else if (buildingID && prevHierarchyID.buildingID != buildingID.toString()) {
                setExcludeDrawings(availableDrawings(buildingID, HIERARCHY_IDS.BUILDING));
                setIncludeDrawings([]);
            } else if (floorID && prevHierarchyID.floorID != floorID.toString()) {
                setExcludeDrawings(availableDrawings(floorID, HIERARCHY_IDS.FLOOR));
                setIncludeDrawings([]);
            }
        }
    }, [siteID, buildingID, drawingID, floorID]);

    //if drawing is selected don't render component
    if (!siteID || drawingID) {
        return false;
    }

    return (
        <DrawingPicker
            excludedDrawings={excludedDrawings}
            includedDrawings={includedDrawings}
            handleAddIncluded={handleAddIncluded}
            handleDrawingClick={handleDrawingClick}
            selectedDrawings={selectedDrawings}
            handleAddExcluded={handleAddExcluded}
        />
    );

    function availableDrawings(hierarchyID, hierarchyTypeID) {
        const allDrawings = Object.values(drawings);

        if (hierarchyTypeID === HIERARCHY_IDS.SITE) {
            return allDrawings
                .filter(drawing => drawing.siteID.toString() === hierarchyID)
                .map(drawing => ({
                    ...drawing,
                    included: false
                }));
        }
        if (hierarchyTypeID === HIERARCHY_IDS.BUILDING) {
            return allDrawings
                .filter(drawing => drawing.buildingID.toString() === hierarchyID)
                .map(drawing => ({
                    ...drawing,
                    included: false
                }));
        }
        if (hierarchyTypeID === HIERARCHY_IDS.FLOOR) {
            return allDrawings
                .filter(drawing => drawing.floorID.toString() === hierarchyID)
                .map(drawing => ({
                    ...drawing,
                    included: false
                }));
        }

        return [];
    }

    //get drawing and select the proper hierarchyID to get the correct floor.
    function handleDrawingClick(e, drawingID) {
        e.preventDefault();

        const newCheckedDrawings = selectedDrawings.includes(drawingID)
            ? selectedDrawings.filter(selectedDrawing => selectedDrawing !== drawingID)
            : [...selectedDrawings, drawingID];

        setSelectedDrawings(newCheckedDrawings);
    }

    function handleAddIncluded(e) {
        // console.warn(this.props);

        e.preventDefault();

        if (selectedDrawings.length && excludedDrawings.length) {
            setIncludeDrawings([
                ...includedDrawings,
                ...excludedDrawings
                    .filter(drawing => selectedDrawings.includes(drawing.id))
                    .map(drawing => ({
                        ...drawing,
                        included: true
                    }))
            ]);
            //dont need this?
            // handleChange('drawingIDs', [
            //     ...includedDrawings.map(drawing => drawing.id),
            //     ...excludedDrawings
            //         .filter(drawing => selectedDrawings.includes(drawing.id))
            //         .map(drawing => drawing.id)
            // ]);
            updateDrawingIDsIncluded([
                ...includedDrawings.map(drawing => drawing.id),
                ...excludedDrawings
                    .filter(drawing => selectedDrawings.includes(drawing.id))
                    .map(drawing => drawing.id)
            ]);
            setExcludeDrawings(
                excludedDrawings
                    .filter(drawing => !selectedDrawings.includes(drawing.id))
                    .map(drawing => ({
                        ...drawing,
                        included: false
                    }))
            );
            setSelectedDrawings([]);
        }
    }
    function handleAddExcluded(e) {
        e.preventDefault();

        if (selectedDrawings.length && includedDrawings.length) {
            setExcludeDrawings([
                ...excludedDrawings,
                ...includedDrawings
                    .filter(drawing => selectedDrawings.includes(drawing.id))
                    .map(drawing => ({
                        ...drawing,
                        included: false
                    }))
            ]);
            updateDrawingIDsIncluded([
                includedDrawings
                    .filter(drawing => !selectedDrawings.includes(drawing.id))
                    .map(drawing => drawing.id)
            ]);
            setIncludeDrawings(
                includedDrawings
                    .filter(drawing => !selectedDrawings.includes(drawing.id))
                    .map(drawing => ({
                        ...drawing,
                        included: true
                    }))
            );

            setSelectedDrawings([]);
        }
    }
};

const mapDispatchToProps = {
    updateDrawingIDsIncluded
};

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer: { sites },
        drawingsReducer: { drawings },
        reportsReducer: {
            filters: { siteID, floorID, buildingID, drawingID }
        }
    }
}) => ({
    siteID,
    sites,
    floorID,
    buildingID,
    drawingID,
    drawings
});

export default withUpdateOnChange(
    withRouter(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(DrawingPickerContainer)
    )
);
