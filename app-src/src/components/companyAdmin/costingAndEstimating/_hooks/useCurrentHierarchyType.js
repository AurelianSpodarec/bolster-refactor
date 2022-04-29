import { useLocation } from 'react-router-dom';
import { HIERARCHY_TYPES } from '../../../../constants/companyAdmin/enums';

export const hierarchyNames = ['Sites', 'Buildings', 'Floors', 'Drawings', 'Pins', 'Installations'];
export const hierarchyClassNames = hierarchyNames.map(hierarchyName => hierarchyName.toLowerCase());

const useCurrentHierarchyLevel = () => {
    const { pathname } = useLocation();
    const pathArr = pathname.split('/');
    if (pathArr.includes('sites')) return HIERARCHY_TYPES.site;
    if (pathArr.includes('buildings')) return HIERARCHY_TYPES.building;
    if (pathArr.includes('floors')) return HIERARCHY_TYPES.floor;
    if (pathArr.includes('drawings')) return HIERARCHY_TYPES.drawing;
    return 0;
};

export default useCurrentHierarchyLevel;
