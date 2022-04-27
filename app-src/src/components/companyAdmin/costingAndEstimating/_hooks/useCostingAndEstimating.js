import { useEffect } from 'react';
import * as dummyData from '../dummyData';

const useCostingAndEstimating = () => {
    const { dummyMain, dummyCart } = dummyData;
    const { keyStatistics, graph, allSites } = dummyMain;

    useEffect(() => {
        // Fetch all data necessary - costing & estimating, sites, buildings, drawings, prelims, pins
    }, []);

    return {
        costingCart: dummyCart,
        graph,
        keyStatistics,
        allSites,
    };
};

export default useCostingAndEstimating;
