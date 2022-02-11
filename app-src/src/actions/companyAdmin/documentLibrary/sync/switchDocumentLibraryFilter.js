import { SWITCH_DOCUMENT_LIBRARY_FILTER } from 'constants/actionTypes/documentLibrary';

export default filter => dispatch => {
    return dispatch({
        type: SWITCH_DOCUMENT_LIBRARY_FILTER,
        filter,
    });
};
