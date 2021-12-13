import { useState } from 'react';

import { useSelector } from 'react-redux';

const useHierarchyDrawingExpiry = id => {
    const [drawings, setDrawings] = useState([]);
    const isFetching = false;
    const error = null;

    return { drawings, isFetching, error };
};

export default useHierarchyDrawingExpiry;
