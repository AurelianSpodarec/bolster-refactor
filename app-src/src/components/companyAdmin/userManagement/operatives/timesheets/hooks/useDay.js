import moment from 'moment';

const getDay = (timesheet, selectedDate) => {
    const start = moment(selectedDate);

    return timesheet.clockerEntries.find(({ date }) => start.isSame(date, 'day'));
};

const useDay = (timesheet, selectedDate) => {
    if (!timesheet) return {};

    const day = getDay(timesheet, selectedDate);

    if (!day) return {};

    const { totalPins, formattedHours, clockerEntries, clockerNotes } = day;

    return { totalPins, formattedHours, clockerEntries, clockerNotes };
};

export default useDay;
