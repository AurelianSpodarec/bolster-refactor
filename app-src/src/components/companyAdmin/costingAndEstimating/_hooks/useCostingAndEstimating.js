import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';
import { useEffect } from 'react';
import { batch, useDispatch } from 'react-redux';
import * as dummyData from '../dummyData';

const useCostingAndEstimating = () => {
    const { dummyMain, dummyCart } = dummyData;
    const { keyStatistics, graph, allSites } = dummyMain;
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch all data necessary - costing & estimating, sites, buildings, drawings, prelims, pins
        batch(() => {
            dispatch(fetchAllBuildings());
            dispatch(fetchAllSites());
            dispatch(fetchAllFloors());
            dispatch(fetchAllDrawings());
        });
    }, []);

    return {
        costingCart: dummyCart,
        graph,
        keyStatistics,
        allSites,
    };
};

export default useCostingAndEstimating;
