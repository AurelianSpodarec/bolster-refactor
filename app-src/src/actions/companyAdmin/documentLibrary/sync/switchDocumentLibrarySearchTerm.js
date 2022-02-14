import { SWITCH_DOCUMENT_LIBRARY_SEARCH_TERM } from 'constants/actionTypes/documentLibrary';

export default searchTerm => dispatch => {
    return dispatch({
        type: SWITCH_DOCUMENT_LIBRARY_SEARCH_TERM,
        searchTerm,
    });
};
