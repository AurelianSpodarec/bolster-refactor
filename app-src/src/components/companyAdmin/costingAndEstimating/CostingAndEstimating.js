import React from 'react';

import GridWrapper from '../../shared/generic/gridWrapper/GridWrapper';

import CostingAndEstimatingPods from './pods/CostingAndEstimatingPods';
import CostingCart from './costingCart/CostingCart';
import useCostingAndEstimating from './_hooks/useCostingAndEstimating';
import useCostingAndEstimatingFilters from './_hooks/useCostingAndEstimatingFilters';
import CostingAndEstimatingGraph from './costingGraph/CostingAndEstimatingGraph';
import useCurrentHierarchyLevel from './_hooks/useCurrentHierarchyLevel';
import CostingAndEstimatingFilterList from './filterList/CostingAndEstimatingFiltersList';

const CostingAndEstimating = () => {
    const { costingCart, graph, keyStatistics, allSites } = useCostingAndEstimating();
    const { filterFormData, onChange, handleToggleItem } = useCostingAndEstimatingFilters();
    const currentHierarchyLevel = useCurrentHierarchyLevel();

    return (
        <GridWrapper gap={30} containerClass="costing-wrapper">
            <CostingAndEstimatingPods data={keyStatistics} />

            <CostingCart data={costingCart} />

            <CostingAndEstimatingGraph
                graph={graph}
                filterFormData={filterFormData}
                onChange={onChange}
            />

            <CostingAndEstimatingFilterList
                sites={allSites}
                currentHierarchyLevel={currentHierarchyLevel}
                selectedItems={filterFormData.selectedItems}
                handleToggleItem={handleToggleItem}
            />
        </GridWrapper>
    );
};

export default CostingAndEstimating;
