import { SWITCH_DOCUMENT_LIBRARY_PAGE } from 'constants/actionTypes/documentLibrary';

export default page => dispatch => {
    return dispatch({
        type: SWITCH_DOCUMENT_LIBRARY_PAGE,
        page,
    });
};
