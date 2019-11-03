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
    const prevDrawings = usePrevious({ drawings });

    useEffect(() => {
        //check which hierarchy has changed and set availableDrawings with the correct hierarchy ID and type

        if (Object.values(drawings).length) {
            if (siteID && prevHierarchyID.siteID != siteID.toString() && !buildingID && !floorID) {
                setExcludeDrawings(availableDrawings(siteID, HIERARCHY_IDS.SITE));
                setIncludeDrawings([]);
            }
            if (buildingID && prevHierarchyID.buildingID != buildingID.toString() && !floorID) {
                setExcludeDrawings(availableDrawings(buildingID, HIERARCHY_IDS.BUILDING));
                setIncludeDrawings([]);
            } else if (
                buildingID != null &&
                prevHierarchyID.buildingID != buildingID.toString() &&
                !floorID
            ) {
                //if user selects all buildings
                setExcludeDrawings(availableDrawings(siteID, HIERARCHY_IDS.SITE));
                setIncludeDrawings([]);
            }

            if (floorID && prevHierarchyID.floorID != floorID.toString()) {
                setExcludeDrawings(availableDrawings(floorID, HIERARCHY_IDS.FLOOR));
                setIncludeDrawings([]);
            } else if (
                floorID != null &&
                prevHierarchyID.floorID != floorID.toString() &&
                !floorID
            ) {
                //if user selects all floors
                setExcludeDrawings(availableDrawings(buildingID, HIERARCHY_IDS.BUILDING));
                setIncludeDrawings([]);
            }

            if (excludedDrawings.length <= 0) {
                //if nothing is set, check which id has the value and set them
                if (floorID) {
                    setExcludeDrawings(availableDrawings(floorID, HIERARCHY_IDS.FLOOR));
                    setIncludeDrawings([]);
                } else if (buildingID) {
                    setExcludeDrawings(availableDrawings(buildingID, HIERARCHY_IDS.BUILDING));
                    setIncludeDrawings([]);
                } else if (siteID) {
                    setExcludeDrawings(availableDrawings(siteID, HIERARCHY_IDS.SITE));
                    setIncludeDrawings([]);
                }
            }
        }

        // if(prevDrawings);
    }, [siteID, buildingID, drawingID, floorID, drawings]);

    //component did mount
    useEffect(() => {
        // console.warn(siteID);
        // console.warn(siteID);
        // console.warn(siteID);
        // console.warn(siteID);
        if (siteID) {
            console.error('siteID hit');

            console.error('siteID hit');
            console.error('siteID hit');
            if (buildingID) {
                console.error('buildingID hit');
                console.error('buildingID hit');
                console.error('buildingID hit');
            }

            setExcludeDrawings(availableDrawings(siteID, HIERARCHY_IDS.SITE));
            setIncludeDrawings([]);
        } else if (buildingID && !floorID) {
            console.log({ buildingID, buildingIDNoFloorID: true });
            setExcludeDrawings(availableDrawings(buildingID, HIERARCHY_IDS.BUILDING));
            setIncludeDrawings([]);
        } else if (floorID) {
            console.log({ floorID, justFloorID: true });

            setExcludeDrawings(availableDrawings(floorID, HIERARCHY_IDS.FLOOR));
            setIncludeDrawings([]);
        }
    }, []);
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
            console.warn({
                siteIDSetfunctionHit: true,
                filteredDrawings: allDrawings.filter(
                    drawing => drawing.siteID.toString() === hierarchyID
                ),
                hierarchyID,
                drawingSiteIDs: allDrawings.map(drawing => drawing.hierarchyID)
            });
            return allDrawings
                .filter(drawing => drawing.siteID.toString() === hierarchyID)
                .map(drawing => ({
                    ...drawing,
                    included: false
                }));
        }
        if (hierarchyTypeID === HIERARCHY_IDS.BUILDING) {
            console.warn({
                BUILDINGIDSetfunctionHit: true,
                filteredDrawings: allDrawings.filter(
                    drawing => drawing.siteID.toString() === hierarchyID
                ),
                hierarchyID,
                drawingBuildingIDs: allDrawings.map(drawing => drawing.hierarchyID)
            });
            return allDrawings
                .filter(drawing => drawing.buildingID.toString() === hierarchyID)
                .map(drawing => ({
                    ...drawing,
                    included: false
                }));
        }
        if (hierarchyTypeID === HIERARCHY_IDS.FLOOR) {
            console.warn({
                FLOORIDSetfunctionHit: true,
                filteredDrawings: allDrawings.filter(
                    drawing => drawing.siteID.toString() === hierarchyID
                ),
                hierarchyID,
                drawingFloorIDs: allDrawings.map(drawing => drawing.hierarchyID)
            });
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
        buildingsReducer: { buildings },
        floorsReducer: { floors },
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
    drawings,
    buildings,
    floors
});

export default withUpdateOnChange(
    withRouter(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(DrawingPickerContainer)
    )
);
