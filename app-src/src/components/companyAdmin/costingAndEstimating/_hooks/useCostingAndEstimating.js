import moment from 'moment';

import { batch, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'helpers/hooks';
import usePrevious from 'hooks/usePrevious';
import useCurrentHierarchyID from './useCurrentHierarchyID';
import useCurrentHierarchyType from './useCurrentHierarchyType';

import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchCostingAndEstimatingData from 'actions/companyAdmin/costingAndEstimating/fetchCostingAndEstimatingData';
import fetchCostingAndEstimatingCart from 'actions/companyAdmin/costingAndEstimating/fetchCostingAndEstimatingCart';

import { selectHierarchySelectedTab } from '../../../../selectors/shared/tabs';
import { selectCostingAndEstimatingCart } from 'selectors/companyAdmin/costingAndEstimating';

import {
    getItemType,
    getSelectionKeyForItem,
    isItemSelected,
    getDataKeyFromItem,
} from '../_helpers/helpers';
import * as dummyData from '../dummyData';

const useCostingAndEstimating = () => {
    const costingCart = useSelector(selectCostingAndEstimatingCart);
    const { dummyMain, dummyCart } = dummyData;
    const { keyStatistics, graph, allSites } = dummyMain;
    const dispatch = useDispatch();
    const hierarchyID = useCurrentHierarchyID();
    const hierarchyType = useCurrentHierarchyType();

    const selectedTab = useSelector(selectHierarchySelectedTab);
    console.log(selectedTab);
    const buildInitialSelectedItems = (data = []) => {
        const selectedItems = {
            buildings: [],
            floors: [],
            drawings: [],
            pins: [],
            installations: [],
            operatives: [],
            services: [],
        };
        const addAllChildren = (item, selectedItems) => {
            const itemType = getItemType(item);
            const dataKey = getDataKeyFromItem(item);
            if (itemType !== 'sites') selectedItems[itemType].push(getSelectionKeyForItem(item));
            const children = item[dataKey] || [];
            if (children.length)
                children.forEach(child => {
                    addAllChildren(child, selectedItems);
                });
            return;
        };
        data.forEach(datum => addAllChildren(datum, selectedItems));
        return selectedItems;
    };

    const handleToggleAllItems = () => {
        if (isAnythingSelected) {
            onChange('selectedItems', {
                buildings: [],
                floors: [],
                drawings: [],
                pins: [],
                installations: [],
                operatives: [],
                services: [],
            });
        } else onChange('selectedItems', buildInitialSelectedItems(allSites));
    };

    const initialFormData = {
        dateRange: {
            startDate: moment().subtract(7, 'days').toDate(),
            endDate: moment().toDate(),
        },
        selectedItems: buildInitialSelectedItems(allSites), // TODO - makes the first fetch happen twice
        maxPrice: 0,
    };
    const [formData, onChange] = useForm(initialFormData);
    const prevProps = usePrevious({ formData });

    const isAnythingSelected = Object.keys(formData.selectedItems).reduce((acc, curr) => {
        if (formData.selectedItems[curr].length) acc = true;
        return acc;
    }, false);

    const handleToggleItem = item => {
        // toggle selection status of any item, regardless of type
        // Propagate the change deeply to all children, regardless of type

        const setOneItem = (item, value, selectedItems) => {
            const itemKey = getSelectionKeyForItem(item);
            const itemType = getItemType(item);
            if (value) {
                switch (itemType) {
                    case 'buildings':
                        selectedItems.buildings.push(itemKey);
                        break;
                    case 'floors':
                        selectedItems.floors.push(itemKey);
                        break;
                    case 'drawings':
                        selectedItems.drawings.push(itemKey);
                        break;
                    case 'pins':
                        selectedItems.pins.push(itemKey);
                        break;
                    case 'installations':
                        selectedItems.installations.push(itemKey);
                        break;
                }
            } else {
                switch (itemType) {
                    case 'buildings':
                        selectedItems.buildings = selectedItems.buildings.filter(
                            id => id !== itemKey,
                        );
                        break;
                    case 'floors':
                        selectedItems.floors = selectedItems.floors.filter(id => id !== itemKey);
                        break;
                    case 'drawings':
                        selectedItems.drawings = selectedItems.drawings.filter(
                            id => id !== itemKey,
                        );
                        break;
                    case 'pins':
                        selectedItems.pins = selectedItems.pins.filter(pinID => pinID !== itemKey);
                        break;
                    case 'installations':
                        selectedItems.installations = selectedItems.installations.filter(
                            name => name !== itemKey,
                        );
                        break;
                }
            }
        };

        const propagateToChildren = (item, value, selectedItems) => {
            const dataKey = getDataKeyFromItem(item);
            setOneItem(item, value, selectedItems);
            const children = item[dataKey] || [];
            if (children.length)
                children.forEach(child => {
                    propagateToChildren(child, value, selectedItems);
                });
            return;
        };

        const selectedItems = { ...formData.selectedItems };
        const value = !isItemSelected(item, selectedItems);
        propagateToChildren(item, value, selectedItems);

        onChange('selectedItems', selectedItems);
    };

    const onThisWeek = () => {
        onChange('dateRange', {
            startDate: moment().subtract(7, 'days').toDate(),
            endDate: moment().toDate(),
        });
    };

    const onPrevWeek = () => {
        onChange('dateRange', {
            startDate: moment(formData.dateRange.startDate).subtract(7, 'days').toDate(),
            endDate: moment(formData.dateRange.endDate).subtract(7, 'days').toDate(),
        });
    };

    const onNextWeek = () => {
        onChange('dateRange', {
            startDate: moment(formData.dateRange.startDate).add(7, 'days').toDate(),
            endDate: moment(formData.dateRange.endDate).add(7, 'days').toDate(),
        });
    };

    const fetchAllData = () => {
        // Fetch all data necessary - costing & estimating, sites, buildings, drawings, prelims, pins
        const cAndEPostBody = {
            hierarchyID,
            hierarchyType,
            fromDate: moment(formData.startDate).format('YYYY-MM-DD'),
            toDate: moment(formData.endDate).format('YYYY-MM-DD'),
        };
        batch(() => {
            dispatch(fetchAllBuildings());
            dispatch(fetchAllSites());
            dispatch(fetchAllFloors());
            dispatch(fetchAllDrawings());
            dispatch(fetchCostingAndEstimatingData(cAndEPostBody));
            dispatch(fetchCostingAndEstimatingCart(cAndEPostBody));
        });
    };

    useEffect(() => {
        fetchAllData();
    }, []); // Fetch all data on page load

    useEffect(() => {
        if (formData !== prevProps.formData) fetchAllData();
    }, [formData, prevProps.formData]); // Fetch all data on filter change

    return {
        costingCart: dummyCart,
        graph,
        keyStatistics,
        allSites,
        filterFormData: formData,
        onChange,
        handleToggleItem,
        handleToggleAllItems,
        isAnythingSelected,
        onThisWeek,
        onPrevWeek,
        onNextWeek,
        hierarchyID,
        hierarchyType,
    };
};

export default useCostingAndEstimating;
