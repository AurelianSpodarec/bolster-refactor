import React, { useMemo, useState } from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import {
    hierarchyNames,
    hierarchyClassNames,
    hierarchyTypes,
} from '../_hooks/useCurrentHierarchyLevel';
import {
    getContentTypeFromItem,
    getDataKeyFromItem,
    isItemSelected,
    getItemType,
} from '../_helpers/helpers';
import { TopLevel } from './contentTypes';
import Error from 'components/shared/generic/misc/presentational/Error';
// import LoadingOverlay from '../LoadingOverlay';

const tableHeaders = {
    buildings: ['', 'Name', 'Cost'],
    floors: ['', 'Name', 'Cost'],
    drawings: ['', 'Name', 'Cost'],
    histories: ['', 'Pin Code', 'Date Created', 'Comment', 'Cost'],
    installations: ['', 'Installation Name', 'Installation Type', 'Comment', 'Cost'],
};

const FilterList = ({
    data,
    hierarchyLevel,
    headers = [],
    selectedItems,
    handleToggleItem,
    nestingLevel,
}) => {
    // hierarchyLevel defines level of items in list
    const marginClass = `margin-${nestingLevel - 1}`;
    return (
        <>
            <div
                className={`header-row ${hierarchyClassNames[hierarchyLevel] || ''} ${marginClass}`}
            >
                {headers.length ? (
                    headers.map((header, i) => (
                        <div className="table-cell" key={i}>
                            {header}
                        </div>
                    ))
                ) : (
                    <div>NO HEADERS</div>
                )}
            </div>
            {data.map((item, i) => (
                <ListItem
                    key={i}
                    item={item}
                    hierarchyLevel={hierarchyLevel}
                    selectedItems={selectedItems}
                    handleToggleItem={handleToggleItem}
                    nestingLevel={nestingLevel + 1}
                />
            ))}
        </>
    );
};

const ListItem = ({ item, hierarchyLevel, selectedItems, handleToggleItem, nestingLevel }) => {
    // hierarchyLevel defines level of this item
    const [isExpanded, setIsExpanded] = useState(false);
    const SpecificContent = getContentTypeFromItem(item);
    const dataKey = getDataKeyFromItem(item);
    const headers = tableHeaders[dataKey];
    const listData = item[dataKey] || [];

    let isSelected = isItemSelected(item, selectedItems);

    const marginClass = `margin-${nestingLevel - 1}`;
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
            {dataKey !== undefined && listData.length && (
                <div className={`expandable ${isExpanded ? 'active' : ''}`}>
                    <FilterList
                        data={listData}
                        hierarchyLevel={hierarchyLevel + 1}
                        headers={headers}
                        selectedItems={selectedItems}
                        handleToggleItem={handleToggleItem}
                        nestingLevel={nestingLevel}
                    />
                </div>
            )}
        </>
    );
};

const CostingAndEstimatingFilterList = ({
    sites = [],
    currentHierarchyLevel,
    selectedItems,
    handleToggleItem,
    handleToggleAllItems,
    isAnythingSelected,
    isFetching,
    fetchError,
}) => {
    const title = hierarchyNames[currentHierarchyLevel + 1] || 'Pin Histories';

    const listData = useMemo(() => {
        if (!sites.length) return [];
        if (currentHierarchyLevel === hierarchyTypes.sites) return sites[0].buildings;
        if (currentHierarchyLevel === hierarchyTypes.buildings) return sites[0].buildings[0].floors;
        if (currentHierarchyLevel === hierarchyTypes.floors)
            return sites[0].buildings[0].floors[0].drawings;
        if (currentHierarchyLevel === hierarchyTypes.drawings)
            return sites[0].buildings[0].floors[0].drawings[0].histories;
    }, [sites]);

    let headers = [];
    if (listData[0]) headers = tableHeaders[getItemType(listData[0])];

    return (
        <div className="filters-list-wrapper">
            <BlockContainer contentClass="border">
                {sites.length && !fetchError && (
                    <>
                        <h3>{title}</h3>
                        <div className="filter-list-row toplevel">
                            <TopLevel
                                item={{ total: 0 }}
                                isSelected={isAnythingSelected}
                                handleToggleAllItems={handleToggleAllItems}
                            />
                        </div>
                        {sites.length && (
                            <FilterList
                                data={listData}
                                hierarchyLevel={currentHierarchyLevel + 1}
                                selectedItems={selectedItems}
                                handleToggleItem={handleToggleItem}
                                headers={headers}
                                nestingLevel={0}
                            />
                        )}
                    </>
                )}
                {!isFetching && fetchError && <Error>{fetchError}</Error>}
                {/* {isFetching && !fetchError && <LoadingOverlay />} */}
            </BlockContainer>
        </div>
    );
};

export default CostingAndEstimatingFilterList;
