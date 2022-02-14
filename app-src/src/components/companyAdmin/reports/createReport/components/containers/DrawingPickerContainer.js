import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

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
    updateDrawingIDsIncluded,
    sites,
    buildings,
    floors,
}) => {
    const [includedDrawings, setIncludeDrawings] = useState([]);
    const [excludedDrawings, setExcludeDrawings] = useState([]);
    const [selectedDrawings, setSelectedDrawings] = useState([]);

    function usePrevious(value) {
        const ref = useRef(value);
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prevHierarchyID = usePrevious({ siteID, buildingID, floorID });

    useEffect(() => {
        // check which hierarchy has changed and set availableDrawings with the correct hierarchy ID and type

        if (Object.values(drawings).length && prevHierarchyID) {
            if (
                siteID.length &&
                !_.isEqual(siteID, prevHierarchyID.siteID) &&
                !buildingID.length &&
                !floorID.length
            ) {
                setExcludeDrawings(availableDrawings(siteID, HIERARCHY_IDS.SITE));
                setIncludeDrawings([]);
            }

            if (
                buildingID.length &&
                !_.isEqual(buildingID, prevHierarchyID.buildingID) &&
                !floorID.length
            ) {
                setExcludeDrawings(availableDrawings(buildingID, HIERARCHY_IDS.BUILDING));
                setIncludeDrawings([]);
            }

            if (floorID.length && !_.isEqual(floorID, prevHierarchyID.floorID)) {
                setExcludeDrawings(availableDrawings(floorID, HIERARCHY_IDS.FLOOR));
                setIncludeDrawings([]);
            }

            if (excludedDrawings.length <= 0) {
                //if nothing is set, check which id has the value and set them
                if (floorID.length) {
                    setExcludeDrawings(availableDrawings(floorID, HIERARCHY_IDS.FLOOR));
                    setIncludeDrawings([]);
                } else if (buildingID.length) {
                    setExcludeDrawings(availableDrawings(buildingID, HIERARCHY_IDS.BUILDING));
                    setIncludeDrawings([]);
                } else if (siteID.length) {
                    setExcludeDrawings(availableDrawings(siteID, HIERARCHY_IDS.SITE));
                    setIncludeDrawings([]);
                }
            }
        }

        // if(prevDrawings);
    }, [siteID, buildingID, drawingID, floorID, drawings]);

    //component did mount
    useEffect(() => {
        if (siteID.length && !buildingID.length) {
            setExcludeDrawings(availableDrawings(siteID, HIERARCHY_IDS.SITE));
            setIncludeDrawings([]);
        } else if (buildingID.length && !floorID.length) {
            setExcludeDrawings(availableDrawings(buildingID, HIERARCHY_IDS.BUILDING));
            setIncludeDrawings([]);
        } else if (floorID.length) {
            setExcludeDrawings(availableDrawings(floorID, HIERARCHY_IDS.FLOOR));
            setIncludeDrawings([]);
        }
    }, []);
    //if drawing is selected don't render component
    if (!siteID.length || drawingID.length) {
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

        const drawingMapFunc = drawing => {
            const site = sites[drawing.siteID] || {};
            const building = buildings[drawing.buildingID] || {};
            const floor = floors[drawing.floorID] || {};
            return {
                ...drawing,
                siteName: site.name,
                buildingName: building.name,
                floorName: floor.name,
                included: false,
            };
        };

        if (hierarchyTypeID === HIERARCHY_IDS.SITE) {
            return allDrawings
                .filter(drawing => hierarchyID.includes(drawing.siteID))
                .map(drawingMapFunc);
        }
        if (hierarchyTypeID === HIERARCHY_IDS.BUILDING) {
            return allDrawings
                .filter(drawing => hierarchyID.includes(drawing.buildingID))
                .map(drawingMapFunc);
        }
        if (hierarchyTypeID === HIERARCHY_IDS.FLOOR) {
            return allDrawings
                .filter(drawing => hierarchyID.includes(drawing.floorID))
                .map(drawingMapFunc);
        }

        return [];
    }

    function handleDrawingClick(e, drawingID, type, index) {
        e.preventDefault();

        let shiftSelectedDrawings = [];
        const drawingList = type === 'included' ? includedDrawings : excludedDrawings;

        const newCheckedDrawings = selectedDrawings.includes(drawingID)
            ? selectedDrawings.filter(selectedDrawing => selectedDrawing !== drawingID)
            : [...selectedDrawings, drawingID];

        setSelectedDrawings(newCheckedDrawings);

        if (e.shiftKey && selectedDrawings.length) {
            let firstSelectedDrawingId = selectedDrawings[0];

            let firstSelectedDrawingIndex;
            for (let i = 0; i < drawingList.length; i++) {
                if (drawingList[i].id === firstSelectedDrawingId) {
                    firstSelectedDrawingIndex = i;
                }
            }
            let shiftSelectedDrawingIndex = index;

            if (firstSelectedDrawingIndex < shiftSelectedDrawingIndex) {
                for (let i = firstSelectedDrawingIndex; i <= shiftSelectedDrawingIndex; i++) {
                    shiftSelectedDrawings.push(drawingList[i].id);
                }
            } else {
                for (let i = firstSelectedDrawingIndex; i >= shiftSelectedDrawingIndex; i--) {
                    shiftSelectedDrawings.push(drawingList[i].id);
                }
            }

            setSelectedDrawings(shiftSelectedDrawings);
        }
    }

    function handleAddIncluded(e) {
        e.preventDefault();

        if (selectedDrawings.length && excludedDrawings.length) {
            setIncludeDrawings([
                ...includedDrawings,
                ...excludedDrawings
                    .filter(drawing => selectedDrawings.includes(drawing.id))
                    .map(drawing => ({
                        ...drawing,
                        included: true,
                    })),
            ]);

            updateDrawingIDsIncluded([
                ...includedDrawings.map(drawing => drawing.id),
                ...excludedDrawings
                    .filter(drawing => selectedDrawings.includes(drawing.id))
                    .map(drawing => drawing.id),
            ]);
            setExcludeDrawings(
                excludedDrawings
                    .filter(drawing => !selectedDrawings.includes(drawing.id))
                    .map(drawing => ({
                        ...drawing,
                        included: false,
                    })),
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
                        included: false,
                    })),
            ]);
            updateDrawingIDsIncluded(
                includedDrawings
                    .filter(drawing => !selectedDrawings.includes(drawing.id))
                    .map(drawing => drawing.id),
            );
            setIncludeDrawings(
                includedDrawings
                    .filter(drawing => !selectedDrawings.includes(drawing.id))
                    .map(drawing => ({
                        ...drawing,
                        included: true,
                    })),
            );

            setSelectedDrawings([]);
        }
    }
};

const mapDispatchToProps = {
    updateDrawingIDsIncluded,
};

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer: { sites },
        buildingsReducer: { buildings },
        floorsReducer: { floors },
        drawingsReducer: { drawings },
        reportsReducer: {
            filters: { siteID, floorID, buildingID, drawingID },
        },
    },
}) => ({
    siteID,
    sites,
    floorID,
    buildingID,
    drawingID,
    drawings,
    buildings,
    floors,
});

export default withUpdateOnChange(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawingPickerContainer)),
);
