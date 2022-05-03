import { useParams } from 'react-router-dom';

const useCurrentHierarchyID = () => {
    const { id } = useParams();
    return +id;
};

export default useCurrentHierarchyID;
