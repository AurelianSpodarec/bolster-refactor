import React from 'react';

import useCostingGraphFilters from '../_hooks/useCostingGraphFilters';

import CostingGraphFilterItem from './CostingGraphFilterItem';

import { dummyInstallationTypes, dummyOperatives, dummyServices } from '../dummyData';
import { COSTING_GRAPH_FILTER_TYPES } from '../../../../constants/companyAdmin/enums';

const filterOptions = [
    {
        id: 1,
        name: 'Operatives',
        options: dummyOperatives,
        type: COSTING_GRAPH_FILTER_TYPES.OPERATIVES,
    },
    { id: 2, name: 'Services', options: dummyServices, type: COSTING_GRAPH_FILTER_TYPES.SERVICES },
    {
        id: 3,
        name: 'Installation Types',
        options: dummyInstallationTypes,
        type: COSTING_GRAPH_FILTER_TYPES.INSTALLATION_TYPES,
    },
    { id: 4, name: 'Price Range', options: 'slider', type: COSTING_GRAPH_FILTER_TYPES.PRICE_RANGE },
];

const CostingGraphFilters = ({ filterFormData, onChange }) => {
    const { expandedId, setExpandedId } = useCostingGraphFilters();
    return (
        <div className="graph-filters-tooltip border">
            {filterOptions.map(option => (
                <CostingGraphFilterItem
                    key={option.id}
                    option={option}
                    expandedId={expandedId}
                    setExpandedId={setExpandedId}
                    onChange={onChange}
                    filterFormData={filterFormData}
                />
            ))}
        </div>
    );
};

export default CostingGraphFilters;
