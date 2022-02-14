import { SWITCH_DOCUMENT_LIBRARY_VIEW } from 'constants/actionTypes/documentLibrary';

export default view => dispatch => {
    return dispatch({
        type: SWITCH_DOCUMENT_LIBRARY_VIEW,
        view,
    });
};
