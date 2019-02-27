import { CLEAR_FIELD_ERRORS } from 'constants/actionTypes/generic';

export default () => dispatch =>
    dispatch({
        type: CLEAR_FIELD_ERRORS
    });
