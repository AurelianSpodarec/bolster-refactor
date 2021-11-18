import { useForm } from 'helpers/hooks';
import useDay from '../../../hooks/useDay';

export const filterTypeOptions = [
    {
        value: 'name',
        label: 'Name',
    },
    {
        value: 'hours',
        label: 'Hours Worked',
    },
];

export const filterDirectionOptions = [
    {
        value: 1,
        label: 'Ascending',
    },
    {
        value: -1,
        label: 'Descending',
    },
];

export const timesheetSort = (filterType, filterDirection, date) => (a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`;
    const nameB = `${b.firstName} ${b.lastName}`;

    const dayA = useDay(a, date);
    const dayB = useDay(b, date);

    const hoursA = dayA.formattedHours;
    const hoursB = dayB.formattedHours;

    switch (filterType) {
        case 'name':
            return filterDirection > 0 ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);

        case 'hours':
            return filterDirection > 0 ? hoursA - hoursB : hoursB - hoursA;
        default:
            return 0;
    }
};

const useOverviewFilters = () => {
    const [formState, handleChange] = useForm({
        filterType: 'name',
        filterDirection: 1,
    });

    return { formState, handleChange };
};

export default useOverviewFilters;
