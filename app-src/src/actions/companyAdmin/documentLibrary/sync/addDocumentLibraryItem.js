import { ADD_DOCUMENT_LIBRARY_ITEM } from 'constants/actionTypes/documentLibrary';

export default payload => dispatch => {
    return dispatch({
        type: ADD_DOCUMENT_LIBRARY_ITEM,
        payload,
    });
};
