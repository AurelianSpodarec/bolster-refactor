import { SET_LABEL_FIELDS } from 'constants/actionTypes/templateBuilder';

export default labelFields => dispatch =>
    dispatch({
        type: SET_LABEL_FIELDS,
        labelFields
    });
