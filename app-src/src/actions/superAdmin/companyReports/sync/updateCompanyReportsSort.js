import { ADMIN_UPDATE_COMPANY_REPORTS_SORT } from 'constants/actionTypes/companyReports';

export default sortString => dispatch =>
    dispatch({
        type: ADMIN_UPDATE_COMPANY_REPORTS_SORT,
        sortString
    });
