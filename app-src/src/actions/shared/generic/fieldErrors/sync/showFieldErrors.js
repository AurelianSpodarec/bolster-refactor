import { SHOW_FIELD_ERRORS } from 'constants/actionTypes/generic';

export default () => dispatch =>
    dispatch({
        type: SHOW_FIELD_ERRORS
    });
