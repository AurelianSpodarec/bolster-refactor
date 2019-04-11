import { UPDATE_COMPANIES_FILTERS } from 'constants/actionTypes/companiesWithPermissions';

export default (fieldName, searchTerm) => dispatch =>
    dispatch({
        type: UPDATE_COMPANIES_FILTERS,
        fieldName,
        searchTerm
    });
