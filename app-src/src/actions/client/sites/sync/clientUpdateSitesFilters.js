import { CLIENT_UPDATE_SITES_FILTERS } from 'constants/actionTypes/sites';

export default (fieldName, searchTerm) => dispatch =>
    dispatch({
        type: CLIENT_UPDATE_SITES_FILTERS,
        fieldName,
        searchTerm
    });
