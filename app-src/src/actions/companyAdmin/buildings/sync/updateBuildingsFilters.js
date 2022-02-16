import { UPDATE_BUILDINGS_FILTERS } from 'constants/actionTypes/buildings';

export default (fieldName, value) => dispatch =>
    dispatch({
        type: UPDATE_BUILDINGS_FILTERS,
        fieldName,
        value,
    });
