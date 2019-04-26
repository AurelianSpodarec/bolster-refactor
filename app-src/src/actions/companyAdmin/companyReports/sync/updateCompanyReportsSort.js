import { UPDATE_COMPANY_REPORTS_SORT } from 'constants/actionTypes/companyReports';

export default sortString => dispatch =>
    dispatch({
        type: UPDATE_COMPANY_REPORTS_SORT,
        sortString
    });
