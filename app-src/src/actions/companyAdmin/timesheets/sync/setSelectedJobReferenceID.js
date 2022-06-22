import { SET_SELECTED_JOB_REFERENCE_ID } from 'constants/actionTypes/timesheets';

export const setJobReferenceIDs = payload => ({
    type: SET_SELECTED_JOB_REFERENCE_ID,
    payload,
});
