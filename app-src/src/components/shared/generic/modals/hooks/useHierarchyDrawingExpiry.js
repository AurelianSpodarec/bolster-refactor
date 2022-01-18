import { useSelector } from 'react-redux';

import { selectAllDrawings, selectDrawingsIsFetching } from 'selectors/companyAdmin/drawings';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

const useHierarchyDrawingExpiry = (id, hierarchyID) => {
    const isFetching = useSelector(selectDrawingsIsFetching);
    const allDrawings = Object.values(useSelector(selectAllDrawings));

    const hierarchyDrawings = allDrawings.reduce((acc, drawing) => {
        if (hierarchyID === HIERARCHY_IDS.SITE && +id === drawing.siteID) {
            acc.push(drawing);
        } else if (hierarchyID === HIERARCHY_IDS.BUILDING && drawing.buildingID === +id) {
            acc.push(drawing);
        } else if (hierarchyID === HIERARCHY_IDS.FLOOR && drawing.floorID === +id) {
            acc.push(drawing);
        }

        return acc;
    }, []);

    return { hierarchyDrawings, isFetching };
};

export default useHierarchyDrawingExpiry;
