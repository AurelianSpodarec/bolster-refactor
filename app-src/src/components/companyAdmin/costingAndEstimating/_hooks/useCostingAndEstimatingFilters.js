import { useForm } from 'helpers/hooks';
import moment from 'moment';
import {
    getItemType,
    getSelectionKeyForItem,
    isItemSelected,
    getDataKeyFromItem,
} from '../filterList/CostingAndEstimatingFiltersList';

const useCostingAndEstimatingFilters = () => {
    const initialFormData = {
        dateRange: {
            startDate: moment().subtract(7, 'days').toDate(),
            endDate: moment().toDate(),
        },
        selectedItems: {
            buildings: [],
            floors: [],
            drawings: [],
            pins: [],
            installations: [],
            operatives: [],
            services: [],
        },
        maxPrice: 0,
    };
    const [formData, onChange] = useForm(initialFormData);

    const handleToggleItem = item => {
        // toggle selection status of any item, regardless of type
        // If some of item's children are selected, it will select all children - TODO
        // If all item's children are unselected or deselected, it will make them match the parent - TODO

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
            const itemType = getItemType(item);
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

    return {
        filterFormData: formData,
        onChange,
        handleToggleItem,
        onThisWeek,
        onPrevWeek,
        onNextWeek,
    };
};

export default useCostingAndEstimatingFilters;
