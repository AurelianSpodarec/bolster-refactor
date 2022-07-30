import { useLocation } from 'react-router-dom';

export const hierarchyTypes = {
    sites: 0,
    buildings: 1,
    floors: 2,
    drawings: 3,
    histories: 4,
    installations: 5,
};

export const hierarchyNames = [
    'Sites',
    'Buildings',
    'Floors',
    'Drawings',
    'Histories',
    'Installations',
];
export const hierarchyClassNames = hierarchyNames.map(hierarchyName => hierarchyName.toLowerCase());

const useCurrentHierarchyLevel = () => {
    const { pathname } = useLocation();
    const pathArr = pathname.split('/');
    if (pathArr.includes('sites')) return hierarchyTypes.sites;
    if (pathArr.includes('buildings')) return hierarchyTypes.buildings;
    if (pathArr.includes('floors')) return hierarchyTypes.floors;
    if (pathArr.includes('drawings')) return hierarchyTypes.drawings;
    if (pathArr.includes('pins')) return hierarchyTypes.histories;
    return 0;
};

export default useCurrentHierarchyLevel;
