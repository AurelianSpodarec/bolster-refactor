import { useLocation } from 'react-router-dom';

const useCurrentHierarchyID = () => {
    const { pathname } = useLocation();
    const id = pathname.split('/').pop();
    return +id;
};

export default useCurrentHierarchyID;
