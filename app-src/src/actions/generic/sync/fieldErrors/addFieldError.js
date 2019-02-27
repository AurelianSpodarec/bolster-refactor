import { ADD_FIELD_ERROR } from 'constants/actionTypes/generic';

export default (fieldName, error) => dispatch =>
    dispatch({
        type: ADD_FIELD_ERROR,
        fieldName,
        error
    });
