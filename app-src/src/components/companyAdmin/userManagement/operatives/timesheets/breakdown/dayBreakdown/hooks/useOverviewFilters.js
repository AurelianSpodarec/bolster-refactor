import { isEmpty } from 'helpers/generic';
import { useForm } from 'helpers/hooks';
import getTimesheetDay from '../../../helpers/getTimesheetDay';

export const filterByOptions = [
    {
        value: 'allUsers',
        label: 'All users',
    },
    {
        value: 'owner',
        label: 'Owners',
    },
    {
        value: 'admin',
        label: 'Admins',
    },
    {
        value: 'operative',
        label: 'Operatives',
    },
    {
        value: 'withSetHours',
        label: 'With set hours',
    },
    {
        value: 'withoutSetHours',
        label: 'Without set hours',
    },
    {
        value: 'withSetWages',
        label: 'With set wages',
    },
    {
        value: 'withoutSetWages',
        label: 'Without set wages',
    },
];

export const sortByOptions = [
    {
        value: 'name',
        label: 'Name',
    },
    {
        value: 'time',
        label: 'Time',
    },
    {
        value: 'hours',
        label: 'Hours Worked',
    },
];

export const sortDirectionOptions = [
    {
        value: 1,
        label: 'Ascending',
    },
    {
        value: -1,
        label: 'Descending',
    },
];

export const timesheetSort = (sortByOption, sortDirection, date) => (a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`;
    const nameB = `${b.firstName} ${b.lastName}`;

    const dayA = getTimesheetDay(a, date);
    const dayB = getTimesheetDay(b, date);

    const hoursA = dayA.formattedHours;
    const hoursB = dayB.formattedHours;

    switch (sortByOption) {
        case 'name':
            return sortDirection > 0 ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        case 'hours':
            return sortDirection > 0 ? hoursA - hoursB : hoursB - hoursA;
        default:
            return 0;
    }
};

export const timesheetFilter = (filterByHasClockedIn, date) => entry => {
    const timesheetEntry = getTimesheetDay(entry, date);

    if (filterByHasClockedIn) {
        if (timesheetEntry.hasClockedInToday) return true;
        else if (timesheetEntry.clockerNotes && !isEmpty(timesheetEntry.clockerNotes)) return true;
        else return false;
    } else {
        return true;
    }
};

const useOverviewFilters = () => {
    const [formState, handleChange] = useForm({
        sortByType: 'hours',
        filterByType: 'allUsers',
        sortDirection: 0,
    });

    return { formState, handleChange };
};

export default useOverviewFilters;
