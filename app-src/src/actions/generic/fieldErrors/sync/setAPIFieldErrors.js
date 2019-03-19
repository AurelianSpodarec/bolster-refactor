import { SET_API_FIELD_ERRORS } from 'constants/actionTypes/generic';
import { isObjEmpty } from 'helpers/generic';

export default (fieldErrors, errorsVisible = true) => dispatch =>
    dispatch({
        type: SET_API_FIELD_ERRORS,
        fieldErrors: formatFieldErrors(fieldErrors),
        errorsVisible
    });

function formatFieldErrors(errors) {
    if (isObjEmpty(errors)) return {};
    return Object.keys(errors).reduce((acc, key) => {
        if (errors[key][0] && errors[key][0]) acc[key] = errors[key][0];
    }, {});
}
