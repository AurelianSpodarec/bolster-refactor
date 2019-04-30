import { REMOVE_FIELD_ERROR } from 'constants/actionTypes/generic';

export default fieldName => async dispatch =>
    await dispatch({
        type: REMOVE_FIELD_ERROR,
        fieldName
    });
