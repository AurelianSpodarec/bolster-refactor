import { CLIENT_UPDATE_SITES_FILTERS } from 'constants/client/actionTypes/clientSites';

export default (fieldName, searchTerm) => dispatch =>
    dispatch({
        type: CLIENT_UPDATE_SITES_FILTERS,
        fieldName,
        searchTerm
    });
