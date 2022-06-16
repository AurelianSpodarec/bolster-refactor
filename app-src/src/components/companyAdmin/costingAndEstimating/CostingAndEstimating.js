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
        filters,
        results,
        filterFormData,
        onChange,
        handleToggleItem,
        handleToggleAllItems,
        isAnythingSelected,
        onThisWeek,
        onPrevWeek,
        onNextWeek,
        isFetchingFilters,
        isFetchingResults,
        fetchError,
        selectedTab,
        cAndEPostBody,
        isBolsterPlusActivated,
    } = useCostingAndEstimating();

    return (
        <div className={isBolsterPlusActivated ? '' : 'blur'}>
            <GridWrapper gap={2} containerClass="costing-wrapper">
                <CostingAndEstimatingPods
                    data={results?.keyStatistics}
                    isFetching={isFetchingResults}
                    fetchError={fetchError}
                />

                <CostingCart
                    data={results}
                    isFetching={isFetchingFilters}
                    fetchError={fetchError}
                    selectedTab={selectedTab}
                    formData={filterFormData}
                    cAndEPostBody={cAndEPostBody}
                />

                <CostingAndEstimatingGraph
                    graph={results?.graph}
                    filterFormData={filterFormData}
                    filters={filters}
                    onChange={onChange}
                    onThisWeek={onThisWeek}
                    onPrevWeek={onPrevWeek}
                    onNextWeek={onNextWeek}
                    isFetching={isFetchingResults}
                    fetchError={fetchError}
                />

                <CostingAndEstimatingFilterList
                    sites={filters.allSites}
                    currentHierarchyLevel={currentHierarchyLevel}
                    selectedItems={filterFormData.selectedItems}
                    handleToggleItem={handleToggleItem}
                    handleToggleAllItems={handleToggleAllItems}
                    isAnythingSelected={isAnythingSelected}
                    isFetching={isFetchingResults}
                    fetchError={fetchError}
                    total={results?.graph?.total}
                />
            </GridWrapper>
        </div>
    );
};

export default CostingAndEstimating;
