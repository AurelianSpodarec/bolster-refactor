import { useSelector } from 'react-redux';

import { selectBuilding } from 'selectors/companyAdmin/buildings';
import { selectDrawing } from 'selectors/companyAdmin/drawings';
import { selectFloor } from 'selectors/companyAdmin/floors';
import { selectSite } from 'selectors/companyAdmin/sites';

const useInheritedFrom = ({ siteID, buildingID, floorID, drawingID }) => {
    const site = siteID && useSelector(state => selectSite(state, siteID));
    const building = buildingID && useSelector(state => selectBuilding(state, buildingID));
    const floor = floorID && useSelector(state => selectFloor(state, floorID));
    const drawing = drawingID && useSelector(state => selectDrawing(state, drawingID));

    const inheritedFrom = siteID
        ? site
        : buildingID
        ? building
        : floorID
        ? floor
        : drawingID
        ? drawing
        : null;

    return { inheritedFrom };
};

export default useInheritedFrom;
