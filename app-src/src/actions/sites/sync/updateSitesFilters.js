import { UPDATE_SITES_FILTERS } from 'constants/actionTypes/sites';

export default (fieldName, searchTerm) => dispatch =>
    dispatch({
        type: UPDATE_SITES_FILTERS,
        fieldName,
        searchTerm
    });
