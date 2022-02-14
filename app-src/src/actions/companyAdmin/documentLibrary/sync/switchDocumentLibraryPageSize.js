import { SWITCH_DOCUMENT_LIBRARY_PAGE_SIZE } from 'constants/actionTypes/documentLibrary';

export default limit => dispatch => {
    return dispatch({
        type: SWITCH_DOCUMENT_LIBRARY_PAGE_SIZE,
        limit,
    });
};
