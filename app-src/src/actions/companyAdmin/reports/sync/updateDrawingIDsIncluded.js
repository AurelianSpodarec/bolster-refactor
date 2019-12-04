import { UPDATE_DRAWING_IDS_INCLUDED } from 'constants/actionTypes/reports';

export default ids => async dispatch =>
    await dispatch({
        type: UPDATE_DRAWING_IDS_INCLUDED,
        ids
    });
