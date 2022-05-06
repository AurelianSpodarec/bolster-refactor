import moment from 'moment';

import { batch, useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'helpers/hooks';
import usePrevious from 'hooks/usePrevious';
import useCurrentHierarchyID from './useCurrentHierarchyID';
import useCurrentHierarchyType from './useCurrentHierarchyType';

import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchCostingAndEstimatingResults from 'actions/companyAdmin/costingAndEstimating/fetchCostingAndEstimatingResults';
import fetchCostingAndEstimatingFilters from 'actions/companyAdmin/costingAndEstimating/fetchCostingAndEstimatingFilters';

import { selectHierarchySelectedTab } from '../../../../selectors/shared/tabs';
import {
    selectCostingAndEstimatingFilters,
    selectCostingAndEstimatingResults,
    selectCostingAndEstimatingResultsIsFetching,
    selectCostingAndEstimatingFiltersIsFetching,
    selectCostingAndEstimatingFetchError,
} from 'selectors/companyAdmin/costingAndEstimating';

import {
    getItemType,
    getSelectionKeyForItem,
    isItemSelected,
    getDataKeyFromItem,
} from '../_helpers/helpers';
import { costingAndEstimatingType } from '../../../../constants/companyAdmin/enums';
import { selectPrelimPostSuccess } from '../../../../selectors/companyAdmin/prelims';
import { isEmpty } from 'helpers/generic';
import fetchCompanyOperatives from 'actions/companyAdmin/operatives/async/fetchCompanyOperatives';
import fetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import fetchPinOptionTypes from 'actions/companyAdmin/pinOptions/async/fetchPinOptionTypes';
import fetchPinOptions from 'actions/companyAdmin/pinOptions/async/fetchPinOptions';
import fetchPinOptionSets from 'actions/companyAdmin/pinOptions/async/fetchPinOptionSets';
import fetchPinOptionVersions from 'actions/companyAdmin/pinOptions/async/fetchPinOptionVersions';

const useCostingAndEstimating = () => {
    const [lastFetch, setLastFetch] = useState(0); // For debounce
    const [willAutoTick, setWillAutoTick] = useState(false);

    const filters = useSelector(selectCostingAndEstimatingFilters);
    const results = useSelector(selectCostingAndEstimatingResults);
    const isFetchingResults = useSelector(selectCostingAndEstimatingResultsIsFetching);
    const isFetchingFilters = useSelector(selectCostingAndEstimatingFiltersIsFetching);
    const fetchError = useSelector(selectCostingAndEstimatingFetchError);
    const prelimPostSuccess = useSelector(selectPrelimPostSuccess);

    const prevData = usePrevious({
        filters,
        results,
        isFetchingResults,
        isFetchingFilters,
        fetchError,
        prelimPostSuccess,
    });

    // const results = useMemo(() => {
    //     if (!isFetchingResults && prevData.isFetchingResults) return results;
    //     else return prevData._results;
    // }, [isFetchingResults, prevData]);

    // const filters = useMemo(() => {
    //     if (!isFetchingFilters && prevData.isFetchingFilters) return _filters;
    //     else return prevData._filters;
    // }, [isFetchingFilters, prevData]);

    const dispatch = useDispatch();
    const hierarchyID = useCurrentHierarchyID();
    const hierarchyType = useCurrentHierarchyType();
    const selectedTab = useSelector(selectHierarchySelectedTab);
    const selectedTabType = costingAndEstimatingType[selectedTab.toUpperCase()];

    const buildInitialSelectedItems = (data = []) => {
        const selectedItems = {
            buildings: [],
            floors: [],
            drawings: [],
            histories: [],
            installations: [],
            installationTypes: filters.pinOptionIDs || [],
            operatives: filters.operativeCompanyUserIDs || [],
            services: filters.serviceIDs || [],
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
                histories: [],
                installations: [],
                operatives: [],
                services: [],
            });
        } else onChange('selectedItems', buildInitialSelectedItems(filters.allSites));
    };

    const initialFormData = {
        dateRange: {
            startDate: moment().subtract(7, 'days').toDate(),
            endDate: moment().toDate(),
        },
        selectedItems: buildInitialSelectedItems(filters.allSites), // TODO - makes the first fetch happen twice
        maxPrice: filters.priceMax,
        minPrice: 0,
    };
    const [formData, onChange] = useForm(initialFormData);
    const prevProps = usePrevious({
        formData,
        selectedTabType,
        selectedTab,
        allSites: filters.allSites,
    });

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
                    case 'histories':
                        selectedItems.histories.push(itemKey);
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
                    case 'histories':
                        selectedItems.histories = selectedItems.histories.filter(
                            pinHistoryID => pinHistoryID !== itemKey,
                        );
                        break;
                    case 'installations':
                        selectedItems.installations = selectedItems.installations.filter(
                            idString => {
                                return (
                                    idString !==
                                    JSON.stringify(item.representsPinHistoryAnswerValueIDs)
                                );
                            },
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

    const buildSelectedInstallations = () => {
        return formData.selectedItems.installations.reduce((acc, curr) => {
            try {
                const arr = JSON.parse(curr);
                acc = acc.concat(arr);
            } catch {
                acc.push(curr);
            }
            return acc;
        }, []);
    };

    const cAndEPostBody = {
        hierarchyID,
        hierarchyType,
        fromDate: moment(formData.dateRange.startDate).format('YYYY-MM-DD'),
        toDate: moment(formData.dateRange.endDate).format('YYYY-MM-DD'),
        costEstType: selectedTabType,
        serviceIDs: formData.selectedItems.services,
        operativeCompanyUserIDs: formData.selectedItems.operatives,
        pinOptionIDs: formData.selectedItems.installationTypes,
        priceMin: +formData.minPrice,
        priceMax: +formData.maxPrice,
        selectedInstallations: buildSelectedInstallations(),
    };

    useEffect(() => {
        batch(() => {
            dispatch(fetchAllBuildings());
            dispatch(fetchAllSites());
            dispatch(fetchAllFloors());
            dispatch(fetchAllDrawings());
            dispatch(fetchCostingAndEstimatingResults(cAndEPostBody));
            dispatch(fetchCostingAndEstimatingFilters(cAndEPostBody));
            dispatch(fetchCompanyOperatives());
            dispatch(fetchAllServices());
            dispatch(fetchPinOptionTypes());
            dispatch(fetchPinOptionSets());
            dispatch(fetchPinOptions());
            dispatch(fetchPinOptionVersions());
        });
        setLastFetch(moment().valueOf());
    }, []); // Fetch all data on page load

    useEffect(() => {
        if (formData !== prevProps.formData || selectedTabType !== prevProps.selectedTabType) {
            if (moment().valueOf() - lastFetch > 1000) {
                batch(() => {
                    dispatch(fetchCostingAndEstimatingResults(cAndEPostBody));
                    dispatch(fetchCostingAndEstimatingFilters(cAndEPostBody));
                });
                setLastFetch(moment().valueOf()); // Primitive debounce - normal function didn't work
            }
        }
    }, [formData, prevProps.formData, prevProps.selectedTabType, selectedTabType]); // Fetch all data on filter change

    useEffect(() => {
        if (prelimPostSuccess && !prevData.prelimPostSuccess) {
            dispatch(fetchCostingAndEstimatingResults(cAndEPostBody));
        }
    }, [prelimPostSuccess, prevData.prelimPostSuccess]); // Re-fetch results data on prelim post success

    useEffect(() => {
        if (selectedTab !== prevProps.selectedTab) {
            setWillAutoTick(true);
        }
    }, [selectedTab, prevProps.selectedTab]); // set auto-tick flag on tab change

    useEffect(() => {
        if (!isFetchingFilters && !prevData.isFetchingFilters && willAutoTick) {
            setWillAutoTick(false);
            onChange('selectedItems', buildInitialSelectedItems(filters.allSites));
        }
    }, [willAutoTick, isFetchingFilters, prevData.isFetchingFilters]); // Auto-tick after fetch if flag is set

    useEffect(() => {
        if (!isEmpty(filters.allSites) && isEmpty(prevProps.allSites)) {
            onChange('selectedItems', buildInitialSelectedItems(filters.allSites));
        }
    }, [filters.allSites, prevProps.allSites]); // auto-tick everything on first data load

    return {
        filters,
        results,
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
        isFetchingFilters,
        isFetchingResults,
        fetchError,
        selectedTab,
    };
};

export default useCostingAndEstimating;
