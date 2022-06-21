import { DAY, RECURRING_TYPE } from './enums';

export const recurringOptions = [
    {
        value: RECURRING_TYPE.NONE,
        label: 'Non-recurring',
    },
    {
        value: RECURRING_TYPE.DAILY,
        label: 'Daily',
    },
    {
        value: RECURRING_TYPE.WEEKLY,
        label: 'Weekly',
    },
    {
        value: RECURRING_TYPE.MONTHLY,
        label: 'Monthly',
    },
];

export const seriesRecurringOptions = [
    {
        value: RECURRING_TYPE.DAILY,
        label: 'Daily',
    },
    {
        value: RECURRING_TYPE.WEEKLY,
        label: 'Weekly',
    },
    {
        value: RECURRING_TYPE.MONTHLY,
        label: 'Monthly',
    },
];
