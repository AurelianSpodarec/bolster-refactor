import * as dummyData from '../dummyData';

const useCostingAndEstimating = () => {
    const { dummyMain, dummyCart } = dummyData;
    const { keyStatistics, graph, allPins } = dummyMain;

    return {
        costingCart: dummyCart,
        graph,
        keyStatistics,
        allPins,
    };
};

export default useCostingAndEstimating;
