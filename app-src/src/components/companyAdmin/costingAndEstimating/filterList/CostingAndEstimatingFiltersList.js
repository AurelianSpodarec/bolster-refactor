import React, { useState } from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import {
    hierarchyNames,
    hierarchyClassNames,
    hierarchyTypes,
} from '../_hooks/useCurrentHierarchyLevel';
import * as contentTypes from './contentTypes';

const tableHeaders = {
    buildings: ['', 'Name', 'Cost'],
    floors: ['', 'Name', 'Cost'],
    drawings: ['', 'Name', 'Cost'],
    pins: ['', 'Pin ID', 'Date Created', 'Comment', 'Cost'],
    installations: ['', 'Installation Name', 'Installation Type', 'Comment', 'Cost'],
};

export const getContentTypeFromItem = item => {
    if (Object.prototype.hasOwnProperty.call(item, 'floors')) return contentTypes.Building;
    if (Object.prototype.hasOwnProperty.call(item, 'drawings')) return contentTypes.Floor;
    if (Object.prototype.hasOwnProperty.call(item, 'pins')) return contentTypes.Drawing;
    if (Object.prototype.hasOwnProperty.call(item, 'installations')) return contentTypes.Pin;
    if (Object.prototype.hasOwnProperty.call(item, 'measurement')) return contentTypes.Installation;
    return null;
};
export const getDataKeyFromItem = item => {
    if (Object.prototype.hasOwnProperty.call(item, 'buildings')) return 'buildings';
    if (Object.prototype.hasOwnProperty.call(item, 'floors')) return 'floors';
    if (Object.prototype.hasOwnProperty.call(item, 'drawings')) return 'drawings';
    if (Object.prototype.hasOwnProperty.call(item, 'pins')) return 'pins';
    if (Object.prototype.hasOwnProperty.call(item, 'installations')) return 'installations';
    return undefined;
};
export const getItemType = item => {
    if (Object.prototype.hasOwnProperty.call(item, 'buildings')) return 'sites';
    if (Object.prototype.hasOwnProperty.call(item, 'floors')) return 'buildings';
    if (Object.prototype.hasOwnProperty.call(item, 'drawings')) return 'floors';
    if (Object.prototype.hasOwnProperty.call(item, 'pins')) return 'drawings';
    if (Object.prototype.hasOwnProperty.call(item, 'installations')) return 'pins';
    if (Object.prototype.hasOwnProperty.call(item, 'measurement')) return 'installations';
    return undefined;
};
export const deepGetAllChildren = (data = [], result) => {
    // Gets every child of every item in data recursively
    data.forEach(item => {
        const itemToAdd = `${item.id ? item.id : item.pinID ? item.pinID : item.name}`;
        if (!result.includes(itemToAdd) && itemToAdd !== 'undefined') result.push(itemToAdd);
        if (item.children) deepGetAllChildren(item.children, result);
    });
    // console.log(result);
    return result;
};
export const isItemSelected = (item, selectedItems) => {
    const itemType = getItemType(item);

    if (itemType === 'buildings') return selectedItems.buildings.includes(item.id);
    if (itemType === 'floors') return selectedItems.floors.includes(item.id);
    if (itemType === 'drawings') return selectedItems.drawings.includes(item.id);
    if (itemType === 'pins') return selectedItems.pins.includes(item.pinID);
    if (itemType === 'installations') return selectedItems.installations.includes(item.name);
    return false;
};
export const getSelectionKeyForItem = item => {
    return item.id ? item.id : item.pinID ? item.pinID : item.name;
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
