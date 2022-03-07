import { UPDATE_DRAWINGS_FILTERS } from 'constants/actionTypes/drawings';

export default (fieldName, value) => dispatch =>
    dispatch({
        type: UPDATE_DRAWINGS_FILTERS,
        fieldName,
        value,
    });
