import { useForm } from 'helpers/hooks';
import moment from 'moment';
import {
    getItemType,
    getSelectionKeyForItem,
    isItemSelected,
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
        },
    };
    const [formData, onChange] = useForm(initialFormData);

    const handleToggleItem = item => {
        // toggle selection status of any item, regardless of type
        // If some of item's children are selected, it will select all children
        // If all item's children are unselected or deselected, it will make them match the parent
        const selectedItems = { ...formData.selectedItems };

        const itemKey = getSelectionKeyForItem(item);
        const itemType = getItemType(item);

        console.log({ item, itemKey, itemType, selected: isItemSelected(item, selectedItems) });

        if (!isItemSelected(item, selectedItems)) {
            switch (itemType) {
                case 'buildings':
                    console.log(`Adding ${itemKey} to ${itemType}`);
                    selectedItems.buildings.push(itemKey);
                    break;
                case 'floors':
                    console.log(`Adding ${itemKey} to ${itemType}`);
                    selectedItems.floors.push(itemKey);
                    break;
                case 'drawings':
                    console.log(`Adding ${itemKey} to ${itemType}`);
                    selectedItems.drawings.push(itemKey);
                    break;
                case 'pins':
                    console.log(`Adding ${itemKey} to ${itemType}`);
                    selectedItems.pins.push(itemKey);
                    break;
                case 'installations':
                    console.log(`Adding ${itemKey} to ${itemType}`);
                    selectedItems.installations.push(itemKey);
                    break;
            }
        } else {
            switch (itemType) {
                case 'buildings':
                    console.log(`Removing ${itemKey} from ${itemType}`);
                    selectedItems.buildings = selectedItems.buildings.filter(id => id !== itemKey);
                    break;
                case 'floors':
                    console.log(`Removing ${itemKey} from ${itemType}`);
                    selectedItems.floors = selectedItems.floors.filter(id => id !== itemKey);
                    break;
                case 'drawings':
                    console.log(`Removing ${itemKey} from ${itemType}`);
                    selectedItems.drawings = selectedItems.drawings.filter(id => id !== itemKey);
                    break;
                case 'pins':
                    console.log(`Removing ${itemKey} from ${itemType}`);
                    selectedItems.pins = selectedItems.pins.filter(pinID => pinID !== itemKey);
                    break;
                case 'installations':
                    console.log(`Removing ${itemKey} from ${itemType}`);
                    selectedItems.installations = selectedItems.installations.filter(
                        name => name !== itemKey,
                    );
                    break;
            }
        }
        onChange('selectedItems', selectedItems);
    };

    return { filterFormData: formData, onChange, handleToggleItem };
};

export default useCostingAndEstimatingFilters;
