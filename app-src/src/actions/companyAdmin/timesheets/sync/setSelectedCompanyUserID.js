import { SET_SELECTED_COMPANY_ID } from 'constants/actionTypes/timesheets';

export const setCompanyUserIDs = payload => ({
    type: SET_SELECTED_COMPANY_ID,
    payload,
});
