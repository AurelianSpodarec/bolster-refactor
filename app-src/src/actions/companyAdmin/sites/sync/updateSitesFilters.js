import { UPDATE_SITES_FILTERS } from 'constants/actionTypes/sites';

export default (fieldName, value) => dispatch =>
    dispatch({
        type: UPDATE_SITES_FILTERS,
        fieldName,
        value,
    });
