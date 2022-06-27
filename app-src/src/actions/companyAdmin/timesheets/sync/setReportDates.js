import { SET_REPORT_DATES } from 'constants/actionTypes/timesheets';

export const setReportDates = payload => ({
    type: SET_REPORT_DATES,
    payload,
});
