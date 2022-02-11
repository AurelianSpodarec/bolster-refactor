import moment from 'moment';

// todo refactor this to not incorrectly be named like a hook
const useDay = (timesheet, selectedDate) => {
    const start = moment(selectedDate);
    const day = timesheet?.clockerEntries?.find(({ date }) => start.isSame(date, 'day'));
    return day ?? {};
};

export default useDay;
