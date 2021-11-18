import { useForm } from 'helpers/hooks';

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

export const timesheetSort = (filterType, filterDirection) => (a, b) => {
    switch (filterType) {
        case 'name':
            const nameA = `${a.firstName} ${a.lastName}`;
            const nameB = `${b.firstName} ${b.lastName}`;
            return filterDirection > 0 ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);

        case 'hours':
            const hoursA = a.formattedHours;
            const hoursB = b.formattedHours;
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
