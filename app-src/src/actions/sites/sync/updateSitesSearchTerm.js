import { UPDATE_SITES_SEARCH_TERM } from 'constants/actionTypes/sites';

export default searchTerm => dispatch =>
    dispatch({
        type: UPDATE_SITES_SEARCH_TERM,
        searchTerm
    });
