import { useForm } from 'helpers/hooks';
import moment from 'moment';

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
            operatives: [],
        },
    };
    const [formData, onChange] = useForm(initialFormData);

    return { filterFormData: formData, onChange };
};

export default useCostingAndEstimatingFilters;
