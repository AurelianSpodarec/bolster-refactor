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
    const nameA = `${a.firstName} ${a.lastName}`;
    const nameB = `${b.firstName} ${b.lastName}`;

    const hoursA = a.formattedHours;
    const hoursB = b.formattedHours;

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
