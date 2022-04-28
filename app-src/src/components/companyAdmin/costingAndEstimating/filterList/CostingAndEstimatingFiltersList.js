import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { hierarchyNames, hierarchyTypes } from '../_hooks/useCurrentHierarchyLevel';

const FilterList = ({ data, hierarchyLevel }) => {
    // hierarchyLevel defines level of items in list
    return (
        <>
            {data.map((item, i) => (
                <ListItem key={i} item={item} hierarchyLevel={hierarchyLevel} />
            ))}
        </>
    );
};

const ListItem = ({ item, hierarchyLevel }) => {
    // hierarchyLevel defines level of this item
    return <div className="filter-list-item">{item.id}</div>;
};

const CostingAndEstimatingFilterList = ({ sites, currentHierarchyLevel }) => {
    const title = hierarchyNames[currentHierarchyLevel + 1] || 'Pins';

    const getListData = () => {
        if (!sites.length) return [];
        if (currentHierarchyLevel === hierarchyTypes.sites) return sites[0].buildings;
        if (currentHierarchyLevel === hierarchyTypes.buildings) return sites[0].buildings[0].floors;
        if (currentHierarchyLevel === hierarchyTypes.floors)
            return sites[0].buildings[0].floors[0].drawings;
        if (currentHierarchyLevel === hierarchyTypes.drawings)
            return sites[0].buildings[0].floors[0].drawings[0].pins;
    };

    return (
        <div className="filters-list-wrapper">
            <BlockContainer contentClass="border">
                <h3>{title}</h3>
                <FilterList data={getListData()} hierarchyLevel={currentHierarchyLevel + 1} />
            </BlockContainer>
        </div>
    );
};

function getHierarchyTypeFromItem(item) {
    if (Object.prototype.hasOwnProperty.call(item, 'buildings')) return hierarchyTypes.sites;
    if (Object.prototype.hasOwnProperty.call(item, 'floors')) return hierarchyTypes.buildings;
    if (Object.prototype.hasOwnProperty.call(item, 'drawings')) return hierarchyTypes.floors;
    if (Object.prototype.hasOwnProperty.call(item, 'pins')) return hierarchyTypes.drawings;
}

export default CostingAndEstimatingFilterList;
