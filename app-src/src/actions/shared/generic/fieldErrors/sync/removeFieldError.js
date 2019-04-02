import { REMOVE_FIELD_ERROR } from 'constants/actionTypes/generic';

export default fieldName => dispatch =>
    dispatch({
        type: REMOVE_FIELD_ERROR,
        fieldName
    });
