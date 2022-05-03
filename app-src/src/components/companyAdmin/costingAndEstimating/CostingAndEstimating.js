import React from 'react';

import GridWrapper from '../../shared/generic/gridWrapper/GridWrapper';

import CostingAndEstimatingPods from './pods/CostingAndEstimatingPods';
import CostingCart from './costingCart/CostingCart';
import useCostingAndEstimating from './_hooks/useCostingAndEstimating';
import CostingAndEstimatingGraph from './costingGraph/CostingAndEstimatingGraph';
import useCurrentHierarchyLevel from './_hooks/useCurrentHierarchyLevel';
import CostingAndEstimatingFilterList from './filterList/CostingAndEstimatingFiltersList';

const CostingAndEstimating = () => {
    const currentHierarchyLevel = useCurrentHierarchyLevel();
    const {
        costingCart,
        graph,
        keyStatistics,
        allSites,
        filterFormData,
        onChange,
        handleToggleItem,
        handleToggleAllItems,
        isAnythingSelected,
        onThisWeek,
        onPrevWeek,
        onNextWeek,
        isFetchingCart,
        isFetchingMainData,
        fetchError,
        selectedTab,
    } = useCostingAndEstimating();

    return (
        <GridWrapper gap={30} containerClass="costing-wrapper">
            <CostingAndEstimatingPods
                data={keyStatistics}
                isFetching={isFetchingMainData}
                fetchError={fetchError}
            />

            <CostingCart
                data={costingCart}
                isFetching={isFetchingCart}
                fetchError={fetchError}
                selectedTab={selectedTab}
                formData={filterFormData}
            />

            <CostingAndEstimatingGraph
                graph={graph}
                filterFormData={filterFormData}
                onChange={onChange}
                onThisWeek={onThisWeek}
                onPrevWeek={onPrevWeek}
                onNextWeek={onNextWeek}
                isFetching={isFetchingMainData}
                fetchError={fetchError}
            />

            <CostingAndEstimatingFilterList
                sites={allSites}
                currentHierarchyLevel={currentHierarchyLevel}
                selectedItems={filterFormData.selectedItems}
                handleToggleItem={handleToggleItem}
                handleToggleAllItems={handleToggleAllItems}
                isAnythingSelected={isAnythingSelected}
                isFetching={isFetchingMainData}
                fetchError={fetchError}
            />
        </GridWrapper>
    );
};

export default CostingAndEstimating;
