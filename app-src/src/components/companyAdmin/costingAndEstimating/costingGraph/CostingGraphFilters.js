import React from 'react';

import useCostingGraphFilters from '../_hooks/useCostingGraphFilters';

import CostingGraphFilterItem from './CostingGraphFilterItem';

// import { dummyInstallationTypes, dummyOperatives, dummyServices } from '../dummyData';
import { COSTING_GRAPH_FILTER_TYPES } from '../../../../constants/companyAdmin/enums';
import { useSelector } from 'react-redux';
import { getOperatives } from 'selectors/companyAdmin/operatives';
import { selectServices } from 'selectors/companyAdmin/services';
import { selectPinOptionVersionsArr } from 'selectors/companyAdmin/pinOptionVersions';

const CostingGraphFilters = ({ filterFormData, filters, onChange }) => {
    const { expandedId, setExpandedId } = useCostingGraphFilters();
    const { priceMin, priceMax, priceStep, operativeCompanyUserIDs, serviceIDs, pinOptionIDs } =
        filters;
    const companyOperatives = useSelector(getOperatives);
    const services = useSelector(selectServices);
    const pinOptionVersions = useSelector(selectPinOptionVersionsArr);

    // console.log({
    //     operativeCompanyUserIDs,
    //     companyOperatives,
    //     serviceIDs,
    //     services,
    //     pinOptionIDs,
    //     pinOptionVersions,
    // });

    const filterOptions = [
        {
            id: 1,
            name: 'Operatives',
            options: Object.values(operativeCompanyUserIDs).map(id => ({
                id,
                name: `${companyOperatives[id]?.userFirstName} ${companyOperatives[id]?.userLastName}`,
            })),
            type: COSTING_GRAPH_FILTER_TYPES.OPERATIVES,
        },
        {
            id: 2,
            name: 'Services',
            options: Object.values(serviceIDs).map(id => ({
                id,
                name: `${services[id]?.name}`,
            })),
            type: COSTING_GRAPH_FILTER_TYPES.SERVICES,
        },
        {
            id: 3,
            name: 'Installation Types',
            options: Object.values(pinOptionIDs).map(id => {
                const latestVersion = pinOptionVersions
                    .filter(v => v.pinOptionID === id)
                    .sort((a, b) => b.revisionNumber - a.revisionNumber)[0];
                return {
                    id,
                    name: `${latestVersion?.name}`,
                };
            }),
            type: COSTING_GRAPH_FILTER_TYPES.INSTALLATION_TYPES,
        },
        // {
        //     id: 4,
        //     name: 'Price Range',
        //     options: 'slider',
        //     type: COSTING_GRAPH_FILTER_TYPES.PRICE_RANGE,
        // },
    ];
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
                    rangeOptions={{ priceMin, priceMax, priceStep }}
                />
            ))}
        </div>
    );
};

export default CostingGraphFilters;
