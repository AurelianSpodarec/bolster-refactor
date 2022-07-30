import { useState } from 'react';

const useCostingGraphFilters = () => {
    const [expandedId, setExpandedId] = useState(null);
    return { expandedId, setExpandedId };
};

export default useCostingGraphFilters;
