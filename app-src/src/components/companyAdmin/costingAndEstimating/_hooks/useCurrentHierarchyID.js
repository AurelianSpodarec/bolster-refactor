import { useLocation } from 'react-router-dom';

const useCurrentHierarchyID = () => {
    const { pathname } = useLocation();
    const pathArr = pathname.split('/');
    return pathArr[pathArr.length - 1];
};

export default useCurrentHierarchyID;
