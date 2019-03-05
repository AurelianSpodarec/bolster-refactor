import { OVERWRITE_FIELD_ERRORS } from 'constants/actionTypes/generic';

export default (fieldErrors, errorsVisible = true) => dispatch =>
    dispatch({
        type: OVERWRITE_FIELD_ERRORS,
        fieldErrors,
        errorsVisible
    });
