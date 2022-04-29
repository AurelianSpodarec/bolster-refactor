import React from 'react';

import useCostingGraphFilters from '../_hooks/useCostingGraphFilters';

import CostingGraphFilterItem from './CostingGraphFilterItem';

import { dummyInstallationTypes, dummyOperatives, dummyServices } from '../dummyData';

const filterOptions = [
    { id: 1, name: 'Operatives', options: dummyOperatives },
    { id: 2, name: 'Services', options: dummyServices },
    { id: 3, name: 'Installation Types', options: dummyInstallationTypes },
    { id: 4, name: 'Price Range', options: 'slider' },
];

const CostingGraphFilters = ({ filterFormData }) => {
    const { expandedId, setExpandedId } = useCostingGraphFilters();

    return (
        <div className="graph-filters-tooltip border">
            {filterOptions.map(option => (
                <CostingGraphFilterItem
                    key={option.id}
                    option={option}
                    expandedId={expandedId}
                    setExpandedId={setExpandedId}
                />
            ))}
        </div>
    );
};

export default CostingGraphFilters;
