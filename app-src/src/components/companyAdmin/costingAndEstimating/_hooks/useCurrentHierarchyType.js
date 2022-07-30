import { useLocation } from 'react-router-dom';
import { HIERARCHY_IDS } from '../../../../constants/companyAdmin/enums';

export const hierarchyNames = ['Sites', 'Buildings', 'Floors', 'Drawings', 'Pins', 'Installations'];
export const hierarchyClassNames = hierarchyNames.map(hierarchyName => hierarchyName.toLowerCase());

const useCurrentHierarchyLevel = () => {
    const { pathname } = useLocation();
    if (pathname.includes('sites')) return HIERARCHY_IDS.SITE;
    if (pathname.includes('buildings')) return HIERARCHY_IDS.BUILDING;
    if (pathname.includes('floors')) return HIERARCHY_IDS.FLOOR;
    if (pathname.includes('drawings')) return HIERARCHY_IDS.DRAWING;
    return 0;
};

export default useCurrentHierarchyLevel;
