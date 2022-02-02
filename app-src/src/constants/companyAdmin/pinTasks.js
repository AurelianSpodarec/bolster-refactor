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

export const dayOptions = [
    { value: DAY.MONDAY, text: 'M' },
    { value: DAY.TUESDAY, text: 'T' },
    { value: DAY.WEDNESDAY, text: 'W' },
    { value: DAY.THURSDAY, text: 'T' },
    { value: DAY.FRIDAY, text: 'F' },
    { value: DAY.SATURDAY, text: 'S' },
    { value: DAY.SUNDAY, text: 'S' },
];
