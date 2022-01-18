import { useSelector } from 'react-redux';

import { selectAllDrawings, selectDrawingsIsFetching } from 'selectors/companyAdmin/drawings';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

const useHierarchyDrawingExpiry = (id, hierarchyID) => {
    const isFetching = useSelector(selectDrawingsIsFetching);
    const allDrawings = Object.values(useSelector(selectAllDrawings));

    const hierarchyDrawings = allDrawings.reduce((acc, drawing) => {
        switch (hierarchyID) {
            case HIERARCHY_IDS.SITE:
                if (drawing.siteID === +id) {
                    acc.push(drawing);
                }
                break;
            case HIERARCHY_IDS.BUILDING:
                if (drawing.buildingID === +id) {
                    acc.push(drawing);
                }
                break;
            case HIERARCHY_IDS.FLOOR:
                if (drawing.floorID === +id) {
                    acc.push(drawing);
                }
                break;
            default:
                break;
        }

        return acc;
    }, []);

    return { hierarchyDrawings, isFetching };
};

export default useHierarchyDrawingExpiry;
