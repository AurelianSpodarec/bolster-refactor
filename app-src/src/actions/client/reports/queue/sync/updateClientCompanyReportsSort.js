import { CLIENT_UPDATE_COMPANY_REPORTS_SORT } from 'constants/client/actionTypes/clientCompanyReports';

export default sortString => dispatch =>
    dispatch({
        type: CLIENT_UPDATE_COMPANY_REPORTS_SORT,
        sortString
    });
