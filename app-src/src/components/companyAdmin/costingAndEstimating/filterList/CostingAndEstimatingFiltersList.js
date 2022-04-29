import React, { useState } from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import {
    hierarchyNames,
    hierarchyClassNames,
    hierarchyTypes,
} from '../_hooks/useCurrentHierarchyLevel';
import { getContentTypeFromItem, getDataKeyFromItem, isItemSelected } from '../_helpers/helpers';
import { TopLevel } from './contentTypes';

const tableHeaders = {
    buildings: ['', 'Name', 'Cost'],
    floors: ['', 'Name', 'Cost'],
    drawings: ['', 'Name', 'Cost'],
    pins: ['', 'Pin ID', 'Date Created', 'Comment', 'Cost'],
    installations: ['', 'Installation Name', 'Installation Type', 'Comment', 'Cost'],
};

const FilterList = ({ data, hierarchyLevel, headers = [], selectedItems, handleToggleItem }) => {
    // hierarchyLevel defines level of items in list
    const marginClass = `margin-${hierarchyLevel - 1}`;
    return (
        <>
            <div
                className={`header-row ${hierarchyClassNames[hierarchyLevel] || ''} ${marginClass}`}
            >
                {headers.map((header, i) => (
                    <div className="table-cell" key={i}>
                        {header}
                    </div>
                ))}
            </div>
            {data.map((item, i) => (
                <ListItem
                    key={i}
                    item={item}
                    hierarchyLevel={hierarchyLevel}
                    selectedItems={selectedItems}
                    handleToggleItem={handleToggleItem}
                />
            ))}
        </>
    );
};

const ListItem = ({ item, hierarchyLevel, selectedItems, handleToggleItem }) => {
    // hierarchyLevel defines level of this item
    const [isExpanded, setIsExpanded] = useState(false);
    const SpecificContent = getContentTypeFromItem(item);
    const dataKey = getDataKeyFromItem(item);
    const headers = tableHeaders[dataKey];

    let isSelected = isItemSelected(item, selectedItems);

    const marginClass = `margin-${hierarchyLevel - 1}`;
    return (
        <>
            <div
                className={`filter-list-row ${hierarchyClassNames[hierarchyLevel]} ${marginClass}`}
            >
                <SpecificContent
                    item={item}
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    isSelected={isSelected}
                    handleToggleItem={handleToggleItem}
                />
            </div>
            {dataKey !== undefined && (
                <div className={`expandable ${isExpanded ? 'active' : ''}`}>
                    <FilterList
                        data={item[getDataKeyFromItem(item)]}
                        hierarchyLevel={hierarchyLevel + 1}
                        headers={headers}
                        selectedItems={selectedItems}
                        handleToggleItem={handleToggleItem}
                    />
                </div>
            )}
        </>
    );
};

const CostingAndEstimatingFilterList = ({
    sites,
    currentHierarchyLevel,
    selectedItems,
    handleToggleItem,
    handleToggleAllItems,
    isAnythingSelected,
}) => {
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
                <div className="filter-list-row toplevel">
                    <TopLevel
                        item={{ total: 0 }}
                        isSelected={isAnythingSelected}
                        handleToggleAllItems={handleToggleAllItems}
                    />
                </div>
                <FilterList
                    data={getListData()}
                    hierarchyLevel={currentHierarchyLevel + 1}
                    selectedItems={selectedItems}
                    handleToggleItem={handleToggleItem}
                />
            </BlockContainer>
        </div>
    );
};

export default CostingAndEstimatingFilterList;
