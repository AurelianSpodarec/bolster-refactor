import { CHANGE_COMPANY_REPORTS_FETCH_FULL } from 'constants/actionTypes/companyReports';

export default () => dispatch =>
    dispatch({
        type: CHANGE_COMPANY_REPORTS_FETCH_FULL,
    });
