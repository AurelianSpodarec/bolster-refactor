import { UPDATE_APPROVED_COMPANIES_FILTERS } from 'constants/actionTypes/approvedCompanies';

export default (fieldName, searchTerm) => dispatch =>
    dispatch({
        type: UPDATE_APPROVED_COMPANIES_FILTERS,
        fieldName,
        searchTerm
    });
