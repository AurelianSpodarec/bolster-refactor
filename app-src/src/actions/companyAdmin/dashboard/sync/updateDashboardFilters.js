import { UPDATE_DASH_STATS_FILTERS } from 'constants/actionTypes/dashboard';

export default (fieldName, searchTerm) => dispatch =>
    dispatch({
        type: UPDATE_DASH_STATS_FILTERS,
        fieldName,
        searchTerm
    });
