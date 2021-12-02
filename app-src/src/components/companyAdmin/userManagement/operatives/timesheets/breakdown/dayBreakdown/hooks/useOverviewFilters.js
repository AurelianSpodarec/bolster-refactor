import { useForm } from 'helpers/hooks';
import { useState } from 'react';
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

export const timesheetFilter = (filterByHasClockedIn, date) => entry => {
    const timesheetEntry = useDay(entry, date);

    if (filterByHasClockedIn) {
        if (timesheetEntry.hasClockedInToday) return true;
        else return false;
    } else {
        return true;
    }
};

const useOverviewFilters = () => {
    const [formState, handleChange] = useForm({
        filterType: 'hours',
        filterDirection: 0,
    });
    const [filterByHasClockedIn, setFilterByHasClockedIn] = useState(false);

    return { formState, handleChange, filterByHasClockedIn, setFilterByHasClockedIn };
};

export default useOverviewFilters;
