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

const FilterList = ({ data, hierarchyLevel, headers = [] }) => {
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
                <ListItem key={i} item={item} hierarchyLevel={hierarchyLevel} />
            ))}
        </>
    );
};

const ListItem = ({ item, hierarchyLevel }) => {
    // hierarchyLevel defines level of this item
    const [isExpanded, setIsExpanded] = useState(false);
    const SpecificContent = getContentTypeFromItem(item);
    const dataKey = getDataKeyFromItem(item);
    const headers = tableHeaders[dataKey];
    const marginClass = `margin-${hierarchyLevel - 1}`;
    return (
        <>
            <div
                className={`filter-list-row ${hierarchyClassNames[hierarchyLevel]} ${marginClass}`}
            >
                <SpecificContent item={item} />
            </div>
            {dataKey !== undefined && (
                <div className="expandable">
                    <FilterList
                        data={item[getDataKeyFromItem(item)]}
                        hierarchyLevel={hierarchyLevel + 1}
                        headers={headers}
                    />
                </div>
            )}
        </>
    );
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

function getContentTypeFromItem(item) {
    if (Object.prototype.hasOwnProperty.call(item, 'floors')) return contentTypes.Building;
    if (Object.prototype.hasOwnProperty.call(item, 'drawings')) return contentTypes.Floor;
    if (Object.prototype.hasOwnProperty.call(item, 'pins')) return contentTypes.Drawing;
    if (Object.prototype.hasOwnProperty.call(item, 'installations')) return contentTypes.Pin;
    if (Object.prototype.hasOwnProperty.call(item, 'measurement')) return contentTypes.Installation;
    return null;
}
function getDataKeyFromItem(item) {
    if (Object.prototype.hasOwnProperty.call(item, 'buildings')) return 'buildings';
    if (Object.prototype.hasOwnProperty.call(item, 'floors')) return 'floors';
    if (Object.prototype.hasOwnProperty.call(item, 'drawings')) return 'drawings';
    if (Object.prototype.hasOwnProperty.call(item, 'pins')) return 'pins';
    if (Object.prototype.hasOwnProperty.call(item, 'installations')) return 'installations';
    return undefined;
}
function getItemType(item) {
    if (Object.prototype.hasOwnProperty.call(item, 'buildings')) return 'sites';
    if (Object.prototype.hasOwnProperty.call(item, 'floors')) return 'buildings';
    if (Object.prototype.hasOwnProperty.call(item, 'drawings')) return 'floors';
    if (Object.prototype.hasOwnProperty.call(item, 'pins')) return 'drawings';
    if (Object.prototype.hasOwnProperty.call(item, 'installations')) return 'pins';
    return undefined;
}

export default CostingAndEstimatingFilterList;
