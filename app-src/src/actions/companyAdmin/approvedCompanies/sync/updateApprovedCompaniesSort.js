import { UPDATE_APPROVED_COMPANIES_SORT } from 'constants/actionTypes/approvedCompanies';

export default sort => dispatch =>
    dispatch({
        type: UPDATE_APPROVED_COMPANIES_SORT,
        sort
    });
