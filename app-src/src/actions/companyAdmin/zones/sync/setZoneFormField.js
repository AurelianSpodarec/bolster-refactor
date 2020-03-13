import { SET_ZONE_FORM_FIELD } from 'constants/actionTypes/zones';

export default (field, value) => dispatch =>
    dispatch({
        type: SET_ZONE_FORM_FIELD,
        field,
        value
    });
