import { useForm } from 'helpers/hooks';
import moment from 'moment';
import { getItemType } from '../filterList/CostingAndEstimatingFiltersList';

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
        console.log(item);
        // toggle selection status of any item, regardless of type
        // If some of item's children are selected, it will select all children
        // If all item's children are unselected or deselected, it will make them match the parent
        const itemType = getItemType(item);
        console.log(itemType);
    };

    return { filterFormData: formData, onChange, handleToggleItem };
};

export default useCostingAndEstimatingFilters;
