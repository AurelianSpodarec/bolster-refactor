import { UPDATE_SITES_SEARCH_TERM } from 'constants/actionTypes/sites';

export default (fieldName, searchTerm) => dispatch =>
    dispatch({
        type: UPDATE_SITES_SEARCH_TERM,
        fieldName,
        searchTerm
    });
