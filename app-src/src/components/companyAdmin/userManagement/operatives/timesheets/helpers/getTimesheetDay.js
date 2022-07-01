import moment from 'moment';

const getTimesheetDay = (timesheet, selectedDate) => {
    const start = moment(selectedDate);
    const day = timesheet?.days?.find(({ date }) => start.isSame(date, 'day'));
    return day ?? {};
};

export default getTimesheetDay;
