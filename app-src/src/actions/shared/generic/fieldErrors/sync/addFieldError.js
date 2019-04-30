import { ADD_FIELD_ERROR } from 'constants/actionTypes/generic';

export default (fieldName, error) => async dispatch =>
    await dispatch({
        type: ADD_FIELD_ERROR,
        fieldName,
        error
    });
